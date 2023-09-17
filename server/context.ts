import prisma from "@/lib/prisma";
import { inferAsyncReturnType } from "@trpc/server";

const createInnerContext = () => {
  return {
    prisma,
  };
};

export const createContext = () => {
  const contextInner = createInnerContext();

  return {
    ...contextInner,
  };
};

export type IContext = inferAsyncReturnType<typeof createContext>;
