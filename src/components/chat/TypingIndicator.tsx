export const TypingIndicator = ({ name }: { name: string }) => (
  <div className="flex items-center gap-1 px-3 py-1 text-[12px] text-[hsl(var(--tg-link))]">
    <span className="flex gap-0.5">
      <span className="typing-dot h-1 w-1 rounded-full bg-[hsl(var(--tg-link))]" />
      <span className="typing-dot h-1 w-1 rounded-full bg-[hsl(var(--tg-link))]" />
      <span className="typing-dot h-1 w-1 rounded-full bg-[hsl(var(--tg-link))]" />
    </span>
    <span>{name} está digitando...</span>
  </div>
);
