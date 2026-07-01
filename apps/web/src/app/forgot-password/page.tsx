"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reset link dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center px-6 selection:bg-neutral-200">
      <div className="w-full max-w-sm flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <Link href="/login" className="font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors">
            ← Back to Login
          </Link>
          <h1 className="font-serif text-3xl font-light tracking-tight mt-4">Reset password</h1>
          <p className="text-xs text-muted mt-1.5">
            {!isSubmitted
              ? "We'll send you a secure link to reset your account password."
              : "Check your email for the reset instructions."}
          </p>
        </div>

        {/* Content View */}
        {!isSubmitted ? (
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-300 disabled:scale-100 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="p-4 border border-border bg-white rounded flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span className="text-xs text-muted font-mono uppercase tracking-wider">Reset link dispatched to inbox.</span>
          </div>
        )}
      </div>
    </div>
  );
}
