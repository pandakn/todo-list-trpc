"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="text-xl px-6 py-8 "
    >
      <div className="flex items-center gap-x-2">
        <LogIn className="hidden sm:block" />
        Sign in with Google
      </div>
    </Button>
  );
}
