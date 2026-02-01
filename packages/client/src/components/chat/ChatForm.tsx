import { FaArrowUpLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { KeyboardEvent } from "react";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      onKeyDown={handleKeyDown}
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
  );
};

export default ChatForm;
