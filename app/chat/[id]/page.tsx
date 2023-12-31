import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
      <div className="flex justify-center items-center text-xs text-gray-300 my-2">
        ChatGPT can make mistakes. Verify important information
      </div>
    </div>
  );
}

export default ChatPage;
