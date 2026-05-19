import { useEffect, useState } from "react";

const STEPS = [
  "Conectando ao Telegram",
  "Verificando link do grupo",
  "Carregando mensagens recentes",
  "Carregando mídias",
  "Pronto",
];

export const LoadingPresell = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const total = 3200;
    const i = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / total) * 100);
      setProgress(p);
      setStepIndex(Math.min(STEPS.length - 1, Math.floor((p / 100) * STEPS.length)));
      if (p >= 100) {
        clearInterval(i);
        setTimeout(onDone, 350);
      }
    }, 60);
    return () => clearInterval(i);
  }, [onDone]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[hsl(var(--tg-header))] to-[hsl(207_89%_40%)] px-8 text-center text-white">
      {/* Telegram-style logo */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white">
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
      </div>

      <h1 className="mb-1 text-[22px] font-semibold">Carregando prévia do grupo</h1>
      <p className="mb-8 text-[14px] text-white/80">
        Estamos buscando as últimas mensagens enviadas no canal privado
      </p>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mb-6 text-[12px] text-white/70">{Math.floor(progress)}%</div>

      <div className="flex items-center gap-2 text-[13px] text-white/90">
        <span className="flex gap-1">
          <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
          <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
          <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span>{STEPS[stepIndex]}</span>
      </div>
    </div>
  );
};
