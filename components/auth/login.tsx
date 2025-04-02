"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/config/firebase";
import { handleLoginWithGoogle } from "@/lib/firebase/auth";
import { createSession } from "@/lib/actions/auth";
import { useToast } from "@/hooks/useToast";
import { Card, CardBody } from "@heroui/card";

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
    toast(handleLogin(e), undefined, "Successfully logged in");
  };

  return (
    <section>
      <Card fullWidth className="p-4 min-w-72">
        <CardBody>
          <h2 className="mb-4 w-full text-center text-xl font-bold">Login</h2>
          <Form onSubmit={onSubmit} className="flex flex-col gap-4 mb-4">
            <Input
              fullWidth
              label="Email Address"
              aria-label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              fullWidth
              label="Password"
              aria-label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="primary" fullWidth type="submit">
              Login
            </Button>
          </Form>

          <div className="flex flex-col gap-4 ">
            <Button
              variant="faded"
              onPress={handleLoginWithGoogle}
              color="primary">
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
              <p>Don't have an account?</p>
              <a href="/register" className="text-blue-500">
                Register
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
