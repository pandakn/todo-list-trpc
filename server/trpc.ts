import { TRPCError, initTRPC } from "@trpc/server";
import { IContext } from "./context";
import { auth } from "@/lib/auth";

const t = initTRPC.context<IContext>().create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuth = middleware(async (opts) => {
  const session = await auth();
  // console.log(session);

  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: session.user,
    },
  });
});

export const protectProcedure = publicProcedure.use(isAuth);
