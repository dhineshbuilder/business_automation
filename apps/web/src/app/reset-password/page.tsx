"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    // Simulate updating password
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
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
          <h1 className="font-serif text-3xl font-light tracking-tight mt-4">New password</h1>
          <p className="text-xs text-muted mt-1.5">
            {!isCompleted
              ? "Set a new password for your FlowChat AI profile."
              : "Password successfully updated."}
          </p>
        </div>

        {/* Content View */}
        {!isCompleted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-300 disabled:scale-100 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Saving password..." : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="p-4 border border-border bg-white rounded flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-xs text-muted font-mono uppercase tracking-wider">Password changed successfully.</span>
            </div>
            <Link
              href="/login"
              className="w-full py-2.5 text-center text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 transition-all active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
