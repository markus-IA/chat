import { type ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";

export const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div
    className="relative h-[760px] w-[370px] overflow-hidden rounded-[44px] bg-black p-2"
    style={{ boxShadow: "var(--shadow-phone)" }}
  >
    <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-white">
      {/* Status bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between bg-[hsl(var(--tg-miniapp-header))] px-6 text-[12px] font-semibold text-white">
        <span>21:26</span>
        <div className="absolute left-1/2 top-1.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <span className="text-[10px]">4G</span>
          <BatteryFull className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="h-full pt-9">{children}</div>
    </div>
  </div>
);
