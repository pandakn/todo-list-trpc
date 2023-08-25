import TodoList from "@/components/TodoList";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.todos.getTodos();

  return (
    <main className="max-w-xl mx-auto p-24 ">
      <h1 className="text-3xl text-center mb-4 font-bold text-[#291334]">
        Todo List tRPC
      </h1>
      <TodoList todos={todos} />
    </main>
  );
}
