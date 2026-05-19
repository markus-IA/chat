import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { VipBanner } from "./VipBanner";
import { VipFooter } from "./VipFooter";
import { VipModal } from "./VipModal";
import {
  type ChatMessage,
  INITIAL_MESSAGES,
  generateRandomMessage,
  randomTypingName,
} from "@/lib/chatData";

export const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [typing, setTyping] = useState<string | null>(null);
  const [onlineCount, setOnlineCount] = useState(4122);
  const [vipOpen, setVipOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Increment online counter slowly
  useEffect(() => {
    const i = setInterval(() => {
      setOnlineCount((c) => c + Math.floor(Math.random() * 4) - 1);
    }, 2500);
    return () => clearInterval(i);
  }, []);

  // Show banner after 7s, open modal after 18s
  useEffect(() => {
    const t1 = setTimeout(() => setShowBanner(true), 7000);
    const t2 = setTimeout(() => setVipOpen(true), 18000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Message engine
  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await wait(1500 + Math.random() * 2000);
        if (cancelled) return;
        const name = randomTypingName();
        setTyping(name);
        await wait(900 + Math.random() * 1400);
        if (cancelled) return;
        setTyping(null);
        const msg = generateRandomMessage();
        setMessages((prev) => {
          const next = [...prev, msg];
          return next.length > 40 ? next.slice(next.length - 40) : next;
        });
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col bg-[hsl(var(--tg-chat-bg))]">
      <ChatHeader onlineCount={onlineCount} />
      {showBanner && <VipBanner onClick={() => setVipOpen(true)} />}

      <div ref={scrollRef} className="tg-wallpaper flex-1 overflow-y-auto py-2">
        <div className="flex flex-col gap-1.5">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} onVideoClick={() => setVipOpen(true)} />
          ))}
        </div>
        {typing && <TypingIndicator name={typing} />}
      </div>

      <VipFooter onClick={() => setVipOpen(true)} />

      <VipModal open={vipOpen} onClose={() => setVipOpen(false)} />
    </div>
  );
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
