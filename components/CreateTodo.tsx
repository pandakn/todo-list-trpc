"use client";

import { trpc } from "@/app/_trpc/client";
import { SetStateAction, useState } from "react";

type CreateTodoProps = {
  submit: (content: string) => Promise<void>;
};

function CreateTodo({ submit }: CreateTodoProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(content);
    setContent("");
  };

  return (
    <div className="mb-4 w-full">
      <form className="flex justify-center flex-col sm:flex-row gap-2 items-center">
        <input
          value={content}
          name="content"
          className="text-lg sm:text-xl p-2 rounded-xl outline-none"
          type="text"
          placeholder="type todo..."
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="whitespace-nowrap bg-[#291334] rounded-md px-4 py-2 text-white font-bold"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
