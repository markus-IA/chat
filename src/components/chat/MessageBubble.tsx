import { Play } from "lucide-react";
import { AVATAR_COLORS, type ChatMessage, type Reaction } from "@/lib/chatData";
import { Avatar } from "./Avatar";

const NameLabel = ({
  name,
  colorIndex,
  isAdmin,
}: {
  name: string;
  colorIndex: number;
  isAdmin?: boolean;
}) => (
  <div className="flex items-center gap-1.5">
    <div
      className="text-[13px] font-semibold leading-tight"
      style={{ color: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
    >
      {name}
    </div>
    {isAdmin && (
      <span className="rounded-sm bg-[hsl(var(--tg-reaction-bg))] px-1 py-px text-[9px] font-semibold uppercase tracking-wide text-[hsl(var(--tg-reaction-foreground))]">
        admin
      </span>
    )}
  </div>
);

const Reactions = ({ reactions }: { reactions?: Reaction[] }) => {
  if (!reactions?.length) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1 pl-1">
      {reactions.map((r, i) => (
        <span
          key={i}
          className="flex items-center gap-1 rounded-full bg-[hsl(var(--tg-reaction-bg))] px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--tg-reaction-foreground))]"
        >
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </span>
      ))}
    </div>
  );
};

export const MessageBubble = ({
  msg,
  onVideoClick,
}: {
  msg: ChatMessage;
  onVideoClick?: () => void;
}) => {
  if (msg.kind === "system") {
    return (
      <div className="flex justify-center py-1 animate-message-in">
        <div className="max-w-[80%] rounded-2xl bg-[hsl(var(--tg-system-bubble))] px-3 py-1.5 text-center text-[12px] text-[hsl(var(--tg-system-foreground))]">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5 px-2 py-0.5 animate-message-in">
      <Avatar initials={msg.initials} colorIndex={msg.colorIndex} />
      <div className="flex max-w-[78%] flex-col">
        <div className="rounded-2xl rounded-tl-md bg-[hsl(var(--tg-bubble))] px-2.5 py-1.5 shadow-[var(--shadow-bubble)]">
          <NameLabel name={msg.author} colorIndex={msg.colorIndex} isAdmin={msg.isAdmin} />
          {msg.kind === "text" ? (
            <div className="mt-0.5 flex items-end gap-2">
              <p className="text-[14px] leading-snug text-[hsl(var(--tg-bubble-foreground))]">
                {msg.text}
              </p>
              <span className="ml-auto shrink-0 text-[10px] text-[hsl(var(--tg-time))]">
                {msg.time}
              </span>
            </div>
          ) : (
            <div className="mt-1">
              <button
                type="button"
                onClick={onVideoClick}
                className="relative block h-40 w-60 overflow-hidden rounded-lg bg-gradient-to-br from-pink-200 via-rose-300 to-rose-500 transition-transform active:scale-[0.98]"
                aria-label="Reproduzir vídeo"
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
                  {msg.sizeMb} MB
                </div>
                <span className="absolute bottom-1.5 right-2 rounded bg-black/55 px-1 text-[10px] text-white">
                  {msg.time}
                </span>
              </button>
              {msg.caption && (
                <p className="mt-1 px-0.5 text-[13px] leading-snug text-[hsl(var(--tg-bubble-foreground))]">
                  {msg.caption}
                </p>
              )}
            </div>
          )}
        </div>
        <Reactions reactions={msg.reactions} />
      </div>
    </div>
  );
};
