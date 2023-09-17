import TodoList from "@/components/TodoList";
import UserProfile from "@/components/UserProfile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const todos = await serverClient.todos.getTodos();

  return (
    <main className="max-w-xl mx-auto p-24 ">
      <div className=" flex items-center justify-center gap-4 mb-6">
        <h1 className="text-3xl text-center font-bold text-textColor">
          Hey 👋🏻, {session.user.name?.split(" ")[0]}
        </h1>
        <UserProfile
          name={session.user.name as string}
          image={session.user.image as string}
        />
      </div>
      <TodoList todos={todos} />
    </main>
  );
}
