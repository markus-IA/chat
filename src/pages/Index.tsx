import { useState } from "react";
import { ChatScreen } from "@/components/chat/ChatScreen";
import { LoadingPresell } from "@/components/chat/LoadingPresell";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-[hsl(var(--tg-chat-bg))]">
      <h1 className="sr-only">Prévia de grupo do Telegram — Juliana Labot</h1>
      <div className="flex h-screen w-full flex-col">
        {loading ? <LoadingPresell onDone={() => setLoading(false)} /> : <ChatScreen />}
      </div>
    </main>
  );
};

export default Index;
