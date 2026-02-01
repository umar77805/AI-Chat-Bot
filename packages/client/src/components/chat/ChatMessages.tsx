import { useEffect, useRef, type ClipboardEvent } from "react";
import Markdown from "react-markdown";

export type Message = {
  content: string;
  source: "user" | "bot";
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onMessageCopy = (e: ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();

    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {messages.map((messageInfo, idx) => (
        <div
          key={idx}
          className={`px-3 py-1 rounded-xl text-xl max-w-lg ${
            messageInfo.source === "user"
              ? "bg-blue-600 text-white self-end"
              : "bg-gray-200 text-black self-start"
          }`}
          onCopy={onMessageCopy}
          ref={idx === messages.length - 1 ? lastMessageRef : null}
        >
          <Markdown>{messageInfo.content}</Markdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
