import { useState, type KeyboardEvent } from "react";
import axios from "axios";
import { FaArrowUpLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const [conversationId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<string[]>([]);

  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const onSubmit = async ({ prompt }: FormData) => {
    reset();

    setMessages((curr) => [...curr, prompt]);

    const { data } = await axios.post<{ message: string }>("/api/chat", {
      prompt,
      conversationId: conversationId,
    });

    setMessages((curr) => [...curr, data.message]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, idx) => (
          <p key={idx}>{message}</p>
        ))}
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
