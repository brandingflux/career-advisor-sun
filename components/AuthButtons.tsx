// components/AuthButtons.tsx
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { account } from '@/lib/appwrite';

export default function AuthButtons() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await account.create(email, password, name);
      router.push('/quiz'); // Redirect after signup
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  const handleLogin = async () => {
    try {
      await account.createEmailSession(email, password);
      router.push('/quiz'); // Redirect after login
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />

      <button onClick={handleSignup} className="bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
      <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">
        Log In
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}