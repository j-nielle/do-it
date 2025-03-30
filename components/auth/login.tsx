"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/config/firebase";
import { handleLoginWithGoogle } from "@/lib/firebase/auth";
import { createSession } from "@/lib/actions/auth";

export default function Login() {
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

  return (
    <section className="p-4 sm:p-6 outline outline-slate-200 sm:mx-auto flex flex-col items-center justify-center w-max gap-4">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </Form>

      <Button onPress={handleLoginWithGoogle}>Sign with Google</Button>
      <div>
        No account? <a href="/register">Create an account</a>
      </div>
    </section>
  );
}
