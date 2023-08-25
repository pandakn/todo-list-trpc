"use client";

import { trpc } from "@/app/_trpc/client";
import { RouterOutputs } from "@/lib/trpc/utils";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";
import { boolean } from "zod";

type TodoListProps = {
  todos: RouterOutputs["todos"]["getTodos"];
};

const TodoList = ({ todos }: TodoListProps) => {
  const getTodos = trpc.todos.getTodos.useQuery(undefined, {
    initialData: todos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addTodo = trpc.todos.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const setDone = trpc.todos.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const handleSetDone = async (id: string, isDone: boolean) => {
    setDone.mutate({
      id,
      isDone,
    });
  };

  const submit = async (content: string) => {
    if (content.length) {
      addTodo.mutate(content);
    }
  };

  return (
    <>
      <CreateTodo submit={submit} />
      <div className="flex flex-col gap-y-4 w-full">
        {getTodos.data.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            isDone={todo.isDone}
            content={todo.content}
            handleSetDone={handleSetDone}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
