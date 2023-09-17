import React from "react";

type TodoCardProps = {
  id: string;
  content: string;
  isDone: boolean;
  handleSetDone: (id: string, isDone: boolean) => Promise<void>;
};

const TodoCard = ({ id, content, isDone, handleSetDone }: TodoCardProps) => {
  return (
    <div className="bg-white shadow-md p-4 w-full rounded-md flex items-center gap-x-2">
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
  );
};

export default TodoCard;
