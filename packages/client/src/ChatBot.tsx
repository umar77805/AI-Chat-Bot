import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { FaArrowUpLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";

type FormData = {
  prompt: string;
};

type Message = {
  content: string;
  source: "user" | "bot";
};

const ChatBot = () => {
  const [conversationId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatResponseLoading, setIsChatResponseLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = async ({ prompt }: FormData) => {
    try {
      setErrorMessage("");
      reset({ prompt: "" });

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

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onMessageCopy = (e: ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();

    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-4 mb-10 overflow-y-auto">
        {messages.map((messageInfo, idx) => (
          <div
            key={idx}
            className={`px-3 py-1 rounded-xl text-xl ${
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
        {isChatResponseLoading ? (
          <div className="p-4 bg-gray-200 self-start rounded-xl flex gap-1">
            <div className="w-1 aspect-square animate-pulse bg-gray-600 rounded-full" />
            <div className="w-1 aspect-square animate-pulse bg-gray-600 rounded-full [animation-delay: 0.2s]" />
            <div className="w-1 aspect-square animate-pulse bg-gray-600 rounded-full [animation-delay: 0.4s]" />
          </div>
        ) : null}
        {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="flex flex-col items-end gap-2 border-2 p-4 rounded-3xl"
      >
        <textarea
          {...register("prompt", {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          className="w-full focus:outline-0 resize-none"
          placeholder="Ask anything..."
          maxLength={1000}
          autoFocus
        />
        <Button
          disabled={!formState.isValid}
          className="rounded-full w-9 aspect-square"
        >
          <FaArrowUpLong />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
