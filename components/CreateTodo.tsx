"use client";

import { useState } from "react";

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
          className="text-lg sm:text-xl p-2 rounded-xl outline-none placeholder:text-base"
          type="text"
          placeholder="What to do on a nice day?"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="whitespace-nowrap bg-textColor rounded-md px-4 py-2 text-white font-bold"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
