import { AVATAR_COLORS } from "@/lib/chatData";

export const Avatar = ({ initials, colorIndex }: { initials: string; colorIndex: number }) => (
  <div
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
    style={{ background: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
  >
    {initials}
  </div>
);
