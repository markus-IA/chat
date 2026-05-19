import { useEffect, useState } from "react";
import { X, Check, Lock, Loader2, Copy, CheckCircle2 } from "lucide-react";
import QRCode from "qrcode";
import julianaAvatar from "@/assets/juliana-avatar.jpg";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SECONDS = 5 * 60;
const AMOUNT = 12;

type Stage = "offer" | "loading" | "pix" | "paid" | "error";

type Transaction = {
  id: string;
  pix_copia_cola: string;
  qr_code_base64: string;
  status: string;
  expires_at?: string;
};

export const VipModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [stage, setStage] = useState<Stage>("offer");
  const [tx, setTx] = useState<Transaction | null>(null);
  const [qrImage, setQrImage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSeconds(TOTAL_SECONDS);
    setStage("offer");
    setTx(null);
    setQrImage("");
    setError(null);
    setCopied(false);
    const i = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(i);
  }, [open]);

  // Polling status do Pix
  useEffect(() => {
    if (stage !== "pix" || !tx?.id) return;
    let cancelled = false;
    const poll = async () => {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 4000));
        if (cancelled) return;
        try {
          const { data } = await supabase.functions.invoke("check-pix", {
            body: { id: tx.id },
          });
          if (data?.success && data.transaction?.status === "paid") {
            setStage("paid");
            return;
          }
        } catch (e) {
          console.error("polling error", e);
        }
      }
    };
    poll();
    return () => {
      cancelled = true;
    };
  }, [stage, tx?.id]);

  // Gera QR code localmente a partir do pix copia e cola
  useEffect(() => {
    if (!tx?.pix_copia_cola) {
      setQrImage("");
      return;
    }
    if (tx.qr_code_base64) {
      setQrImage(tx.qr_code_base64);
      return;
    }
    QRCode.toDataURL(tx.pix_copia_cola, {
      width: 512,
      margin: 1,
      errorCorrectionLevel: "M",
    })
      .then(setQrImage)
      .catch((e) => console.error("QR gen error", e));
  }, [tx?.pix_copia_cola, tx?.qr_code_base64]);

  const handleGeneratePix = async () => {
    setStage("loading");
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-pix",
        {
          body: {
            amount: AMOUNT,
            description: "Acesso VIP - Juliana Labot",
            external_id: `vip-${Date.now()}`,
          },
        }
      );
      if (fnError) throw new Error(fnError.message);
      if (!data?.success) throw new Error(data?.error || "Erro ao gerar Pix");
      setTx(data.transaction);
      setStage("pix");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro desconhecido";
      setError(msg);
      setStage("error");
    }
  };

  const handleCopy = async () => {
    if (!tx?.pix_copia_cola) return;
    try {
      await navigator.clipboard.writeText(tx.pix_copia_cola);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-message-in">
      <div className="relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        {stage === "offer" && (
          <OfferView
            mm={mm}
            ss={ss}
            onCheckout={handleGeneratePix}
          />
        )}

        {stage === "loading" && (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-[14px] text-foreground">Gerando seu Pix...</p>
          </div>
        )}

        {stage === "pix" && tx && (
          <PixView
            tx={tx}
            qrImage={qrImage}
            mm={mm}
            ss={ss}
            copied={copied}
            onCopy={handleCopy}
          />
        )}

        {stage === "paid" && <PaidView />}

        {stage === "error" && (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
            <div className="text-4xl">⚠️</div>
            <p className="text-[14px] font-semibold text-foreground">
              Não foi possível gerar o Pix
            </p>
            <p className="text-[12px] text-muted-foreground">{error}</p>
            <button
              onClick={handleGeneratePix}
              className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 text-[13px] font-semibold text-white"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const OfferView = ({
  mm,
  ss,
  onCheckout,
}: {
  mm: string;
  ss: string;
  onCheckout: () => void;
}) => (
  <>
    <div className="relative bg-gradient-to-br from-rose-500 via-pink-600 to-red-600 px-5 pb-4 pt-6 text-center text-white">
      <div className="mx-auto mb-2 h-16 w-16 overflow-hidden rounded-full ring-4 ring-white/30">
        <img
          src={julianaAvatar}
          alt="Juliana Labot"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
        🎁 Você foi selecionado
      </div>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight">
        Acesso VIP liberado
        <br />
        por tempo limitado
      </h2>
    </div>

    <div className="px-5 pb-5 pt-4">
      <div className="mb-4 rounded-xl border-2 border-red-500/60 bg-red-50 px-3 py-2 text-center">
        <div className="text-[10px] font-bold uppercase tracking-wider text-red-700">
          ⏰ Esta oferta expira em
        </div>
        <div className="mt-0.5 font-mono text-[26px] font-extrabold leading-none text-red-600">
          {mm}:{ss}
        </div>
      </div>

      <div className="mb-4 text-center">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
          De{" "}
          <span className="font-semibold text-zinc-500 line-through">
            R$ 47,00
          </span>{" "}
          por apenas
        </div>
        <div className="mt-0.5 flex items-baseline justify-center gap-1">
          <span className="text-[18px] font-bold text-emerald-600">R$</span>
          <span className="text-[48px] font-extrabold leading-none text-emerald-600">
            12
          </span>
          <span className="text-[18px] font-bold text-emerald-600">,00</span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          pagamento único · acesso vitalício
        </div>
      </div>

      <ul className="mb-5 space-y-1.5">
        {[
          "Pack completo da Juliana (sem cortes)",
          "Acesso aos vídeos exclusivos do VIP",
          "Conteúdos novos toda semana",
          "Grupo privado liberado pra sempre",
        ].map((b) => (
          <li key={b} className="flex items-start gap-2 text-[13px]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-foreground">{b}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCheckout}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-3.5 text-white shadow-[0_4px_0_0_hsl(142_71%_30%)] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_0_hsl(142_71%_30%)]"
      >
        <Lock className="h-4 w-4" />
        <span className="text-[15px] font-extrabold uppercase tracking-wide">
          Gerar Pix · R$12
        </span>
      </button>

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        🔒 Pagamento 100% seguro · Liberação imediata
      </p>
    </div>
  </>
);

const PixView = ({
  tx,
  qrImage,
  mm,
  ss,
  copied,
  onCopy,
}: {
  tx: Transaction;
  qrImage: string;
  mm: string;
  ss: string;
  copied: boolean;
  onCopy: () => void;
}) => (
  <div className="px-5 pb-5 pt-6">
    <div className="text-center">
      <h2 className="text-[18px] font-bold text-foreground">
        Pague com Pix · R$ 12,00
      </h2>
      <p className="mt-1 text-[12px] text-muted-foreground">
        Escaneie o QR Code ou copie o código abaixo
      </p>
    </div>

    <div className="mx-auto mt-4 flex h-56 w-56 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white p-2">
      {qrImage ? (
        <img
          src={qrImage}
          alt="QR Code Pix"
          className="h-full w-full object-contain"
        />
      ) : (
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      )}
    </div>

    <button
      onClick={onCopy}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-emerald-700 transition-colors hover:bg-emerald-100"
    >
      {copied ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-[13px] font-bold">Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span className="text-[13px] font-bold uppercase tracking-wide">
            Copiar Pix copia e cola
          </span>
        </>
      )}
    </button>

    <div className="mt-3 break-all rounded-lg bg-zinc-50 p-2.5 font-mono text-[10px] leading-tight text-zinc-600">
      {tx.pix_copia_cola}
    </div>

    <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
      <Loader2 className="h-3.5 w-3.5 animate-spin" />
      <span className="text-[12px] font-medium">
        Aguardando pagamento...
      </span>
    </div>

    <p className="mt-3 text-center text-[11px] text-muted-foreground">
      Esta cobrança expira em <span className="font-semibold">{mm}:{ss}</span>
      <br />
      Liberação automática assim que o pagamento for confirmado.
    </p>
  </div>
);

const PaidView = () => (
  <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
      <CheckCircle2 className="h-12 w-12 text-emerald-600" />
    </div>
    <h2 className="text-[20px] font-extrabold text-foreground">
      Pagamento confirmado!
    </h2>
    <p className="text-[13px] text-muted-foreground">
      Seu acesso VIP foi liberado. Verifique seu Telegram pra entrar no grupo
      privado.
    </p>
    <a
      href="https://t.me/Acesso_Vip_JulianaLabot?start="
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-6 py-3 text-[14px] font-bold text-white shadow-md"
    >
      Acessar grupo VIP →
    </a>
  </div>
);
