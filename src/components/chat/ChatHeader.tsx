import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import julianaAvatar from "@/assets/juliana-avatar.jpg";

export const ChatHeader = ({ onlineCount }: { onlineCount: number }) => (
  <div className="shrink-0 flex items-center gap-3 bg-[hsl(var(--tg-header))] px-3 py-2.5 text-[hsl(var(--tg-header-foreground))]">
    <ArrowLeft className="h-5 w-5" />
    <img
      src={julianaAvatar}
      alt="Juliana Labot"
      className="h-9 w-9 shrink-0 rounded-full object-cover"
    />
    <div className="flex-1 leading-tight">
      <div className="text-[15px] font-semibold">
        Grupo Vip - Juliana Labot
      </div>
      <div className="text-[11px] text-white/80">
        121.847 membros, {onlineCount.toLocaleString("pt-BR")} online
      </div>
    </div>
    <Search className="h-5 w-5" />
    <MoreVertical className="h-5 w-5" />
  </div>
);
