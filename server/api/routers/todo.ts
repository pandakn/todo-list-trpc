import prisma from "@/lib/prisma";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const todoRouter = router({
  getTodos: publicProcedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { input } = opts;

    await prisma.todo.create({ data: { content: input } });
  }),
  setDone: publicProcedure
    .input(z.object({ id: z.string(), isDone: z.boolean() }))
    .mutation(async (opts) => {
      const { input } = opts;

      await prisma.todo.update({
        where: { id: input.id },
        data: { isDone: input.isDone },
      });
    }),
});
