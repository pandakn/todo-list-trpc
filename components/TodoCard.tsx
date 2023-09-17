"use client";

import { Trash2 } from "lucide-react";

type TodoCardProps = {
  id: string;
  content: string;
  isDone: boolean;
  handleSetDone: (id: string, isDone: boolean) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
};

const TodoCard = ({
  id,
  content,
  isDone,
  handleSetDone,
  handleDeleteTodo,
}: TodoCardProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-x-2 truncate flex-1">
        <input
          checked={isDone}
          type="checkbox"
          className="h-5 w-5 accent-textColor hover:cursor-pointer"
          onChange={() => handleSetDone(id, isDone ? false : true)}
        />
        <p
          className={`text-lg md:text-2xl text-textColor ${
            isDone && "line-through"
          }`}
        >
          {content}
        </p>
      </div>

      <button type="button" onClick={() => handleDeleteTodo(id)}>
        <Trash2 color="#f50000" className="ml-4 w-8 h-8 hover:opacity-60" />
      </button>
    </div>
  );
};

export default TodoCard;
