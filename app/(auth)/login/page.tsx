"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-2xl px-6"
        >
            Login
        </Button>
    );
}