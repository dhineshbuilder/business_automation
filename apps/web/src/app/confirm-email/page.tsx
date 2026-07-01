"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isResent, setIsResent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSupabaseConfigured =
    typeof window !== "undefined" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleResend = async () => {
    if (!email) {
      alert("Email address not found in query params.");
      return;
    }

    setIsLoading(true);
    if (!isSupabaseConfigured) {
      // Mock fallback
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      setIsResent(true);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        alert(error.message);
      } else {
        setIsResent(true);
      }
    } catch (err: any) {
      alert(err?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center px-6 selection:bg-neutral-200">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {/* Envelope Icon */}
        <div className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center mb-6">
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl font-light tracking-tight mb-2">Check your email</h1>
        <p className="text-xs text-muted leading-relaxed max-w-xs mb-8">
          We've sent a secure confirmation link to <span className="font-semibold">{email || "your inbox"}</span>. Click the link inside the email to verify and activate your profile.
        </p>

        {/* Actions Pane */}
        <div className="w-full flex flex-col gap-4">
          <Link
            href="/"
            className="w-full py-2.5 text-center text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 transition-all active:scale-[0.98]"
          >
            Return to Sign In
          </Link>

          {!isResent ? (
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="text-[10px] font-mono text-muted uppercase tracking-wider hover:text-foreground disabled:text-neutral-300 transition-colors mt-2"
            >
              {isLoading ? "Resending link..." : "Resend confirmation link"}
            </button>
          ) : (
            <div className="mt-2 flex items-center justify-center gap-2 py-1 px-3 border border-emerald-100 bg-emerald-50/50 rounded text-[10px] font-mono text-emerald-700 uppercase tracking-wider animate-in fade-in duration-200">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Link successfully resent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  );
}
