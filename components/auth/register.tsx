'use client'

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { auth } from '@/config/firebase';
import { handleLoginWithGoogle } from '@/lib/firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createSession } from '@/lib/actions/auth';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await createSession(cred.user.uid);
    } catch (error) {
      console.error('Registration failed:', error);
    }
	};

	return (
		<section className="p-4 sm:p-6 outline outline-slate-200 sm:mx-auto flex flex-col items-center justify-center w-max gap-4">
			<h2>Create an account</h2>
			<Form onSubmit={handleRegister}>
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

				<Button type="submit" className='w-full'>Create Account</Button>
			</Form>

			<Button onPress={handleLoginWithGoogle}>
				Login with Google
			</Button>
			<div>
				Already have an account? <a href="/login">Login</a>
			</div>
		</section>
	);
}