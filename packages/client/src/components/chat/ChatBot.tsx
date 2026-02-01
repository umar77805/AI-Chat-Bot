import { useState } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import ChatMessages, { type Message } from "./ChatMessages";
import ChatForm, { type ChatFormData } from "./ChatForm";

const ChatBot = () => {
  const [conversationId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatResponseLoading, setIsChatResponseLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setErrorMessage("");
      setMessages((curr) => [...curr, { content: prompt, source: "user" }]);
      setIsChatResponseLoading(true);

      const { data } = await axios.post<{ message: string }>("/api/chat", {
        prompt,
        conversationId: conversationId,
      });

      setMessages((curr) => [
        ...curr,
        { content: data.message, source: "bot" },
      ]);
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Something went wrong!");
    } finally {
      setIsChatResponseLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-4 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isChatResponseLoading ? <TypingIndicator /> : null}
        {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
      </div>
      <ChatForm onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
