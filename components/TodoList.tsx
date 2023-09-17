"use client";

import { trpc } from "@/app/_trpc/client";
import { RouterOutputs } from "@/lib/trpc/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";

type TodoListProps = {
  todos: RouterOutputs["todos"]["getTodos"];
};

const TodoList = ({ todos }: TodoListProps) => {
  const getTodos = trpc.todos.getTodos.useQuery(undefined, {
    initialData: todos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [listTodoRef] = useAutoAnimate();

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

  const handleSetDone = async (id: string, completed: boolean) => {
    setDone.mutate({
      id,
      completed,
    });
  };

  const deleteTodo = trpc.todos.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const handleDeleteTodo = async (id: string) => {
    deleteTodo.mutate({
      id,
    });
  };

  const submit = async (content: string) => {
    if (content.length) {
      const res = await addTodo.mutateAsync(content);
      console.log(res);
    }
  };

  return (
    <>
      <CreateTodo submit={submit} />
      <div ref={listTodoRef} className="flex flex-col gap-y-4 w-full">
        {getTodos.data.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            isDone={todo.completed}
            content={todo.content}
            handleSetDone={handleSetDone}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
