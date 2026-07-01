"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading, login, triggerGoogleLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Invalid credentials. Please check your details.");
      setIsSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center px-6 selection:bg-neutral-200">
      <div className="w-full max-w-sm flex flex-col">
        {/* Logo/Brand */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">FlowChat AI</span>
          <h1 className="font-serif text-3xl font-light tracking-tight mt-4">Welcome back</h1>
          <p className="text-xs text-muted mt-1.5">Sign in to your automation console.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50/50 rounded flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-600 leading-normal">{error}</span>
          </div>
        )}

        {/* OAuth Button */}
        <button
          onClick={triggerGoogleLogin}
          className="flex items-center justify-center gap-2.5 w-full py-2.5 border border-border bg-white text-xs font-semibold rounded hover:bg-neutral-50 active:scale-[0.98] transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.64 14.99 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.86 3c.9-2.7 3.4-4.46 6.64-4.46z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.8-.07-1.56-.2-2.27H12v4.51h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.97 3.74-4.87 3.74-8.64z"
            />
            <path
              fill="#FBBC05"
              d="M5.36 14.5c-.24-.72-.36-1.5-.36-2.3s.12-1.58.36-2.3L1.5 6.9C.54 8.9 0 11.1 0 13.5s.54 4.6 1.5 6.6l3.86-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.52 1.18-4.3 1.18-3.24 0-5.74-1.76-6.64-4.46L1.5 16.97C3.39 20.82 7.35 23 12 23z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-border flex-1" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted">or use credentials</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
              className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" className="text-[10px] font-mono text-muted uppercase tracking-wider hover:text-foreground transition-colors">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-300 disabled:scale-100 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Registration Prompt */}
        <p className="text-center text-xs text-muted mt-8">
          Don't have an account?{" "}
          <Link href="/signup" className="underline hover:text-foreground transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
