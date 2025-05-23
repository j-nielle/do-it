"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, CardBody } from "@heroui/card";

import { createSession } from "@/lib/actions/auth";
import { useToast } from "@/hooks/useToast";
import { handleGoogleLogin } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      await createSession(cred.user.uid);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    toast(handleLogin(e), "custom", "Successfully logged in");
  };

  return (
    <section>
      <Card fullWidth className="p-4 min-w-72">
        <CardBody>
          <p className="mb-4 w-full text-center text-xl font-bold">Login</p>
          <Form className="flex flex-col gap-4 mb-4" onSubmit={onSubmit}>
            <Input
              fullWidth
              aria-label="Email Address"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              fullWidth
              aria-label="Password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button fullWidth color="primary" type="submit">
              Login
            </Button>
          </Form>

          <div className="flex flex-col gap-4 ">
            <Button
              color="primary"
              variant="faded"
              onPress={handleGoogleLogin}
            >
              Login with{" "}
              <span className="space-x-0.5">
                <span className="text-[#4387f3] font-semibold">G</span>
                <span className="text-[#eb4335] font-semibold">o</span>
                <span className="text-[#f6bd43] font-semibold">o</span>
                <span className="text-[#4684f3] font-semibold">g</span>
                <span className="text-[#4caa55] font-semibold">l</span>
                <span className="text-[#e74335] font-semibold">e</span>
              </span>
            </Button>
            <div>
              <p>Don&apos;t have an account?</p>
              <a className="text-blue-500" href="/register">
                Register
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
