import { todoRouter } from "./api/routers/todo";
import { router } from "./trpc";

export const appRouter = router({
  todos: todoRouter,
});

export type AppRouter = typeof appRouter;
