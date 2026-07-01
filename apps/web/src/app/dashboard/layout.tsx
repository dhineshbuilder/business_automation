"use client";

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        const linked = localStorage.getItem("whatsAppLinked");
        if (!linked) {
          router.replace("/onboarding/link-whatsapp");
        }
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        <span className="text-xs font-mono text-muted uppercase tracking-wider">Verifying session credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col md:flex-row">
      {/* Sidebar Pane (250px) */}
      <aside className="w-full md:w-64 border-r border-border bg-white flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-border">
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold">FlowChat AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1 text-sm">
            <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-neutral-100 font-medium transition-colors">
              Console Overview
            </Link>
            <Link href="/dashboard/consultant" className="px-3 py-2 rounded text-muted hover:text-foreground hover:bg-neutral-50 font-medium transition-colors">
              AI Consultant
            </Link>
            <Link href="/dashboard/marketplace" className="px-3 py-2 rounded text-muted hover:text-foreground hover:bg-neutral-50 font-medium transition-colors">
              Solutions Marketplace
            </Link>
            <button
              onClick={() => alert("Configure: Collect Payments (Auto Invoices & Payment triggers)")}
              className="w-full text-left px-3 py-2 rounded text-muted hover:text-foreground hover:bg-neutral-50 transition-colors"
            >
              Collect Payments
            </button>
            <button
              onClick={() => alert("Configure: Reduce Support (AI FAQ answering nodes)")}
              className="w-full text-left px-3 py-2 rounded text-muted hover:text-foreground hover:bg-neutral-50 transition-colors"
            >
              Reduce Support
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-neutral-50/50">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Dev Session</span>
          <button
            onClick={logout}
            className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 min-w-0 bg-background">
        {children}
      </main>
    </div>
  );
}
