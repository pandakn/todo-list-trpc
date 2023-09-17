import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { protectProcedure, publicProcedure, router } from "@/server/trpc";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const todoRouter = router({
  getTodos: protectProcedure.query(async ({ ctx }) => {
    const todos = await prisma.todo.findMany({
      where: { userId: ctx.user.id },
    });
    // const todos = await prisma.todo.findMany();

    return todos;
  }),
  addTodo: protectProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await prisma.todo.create({
        data: { content: input, userId: ctx.user.id },
      });
    }),
  setDone: protectProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async (opts) => {
      const { input } = opts;

      await prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
});
