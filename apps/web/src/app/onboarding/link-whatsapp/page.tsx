"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkWhatsappPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [wabaId, setWabaId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/onboarding/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          phoneNumberId,
          accessToken,
          wabaId: wabaId || "default_waba_id",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to verify connection");

      // Set cookie/localStorage item indicating activation status for mock redirect checks
      localStorage.setItem("whatsAppLinked", "true");
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Could not link number. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-[480px] w-full bg-white border border-border p-8 rounded-lg shadow-sm flex flex-col gap-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted">ONBOARDING PHASE 02</span>
          <h1 className="font-serif text-2xl font-light tracking-tight mt-1.5">Link Your WhatsApp</h1>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            Enter your Meta Developers Portal parameters to authorize your channel. This connects your business number in under 60 seconds.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono text-muted uppercase tracking-wider">WhatsApp Phone Number</label>
            <input
              required
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Phone Number ID</label>
            <input
              required
              type="text"
              placeholder="e.g. 104239849208390"
              value={phoneNumberId}
              onChange={(e) => setPhoneNumberId(e.target.value)}
              className="px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono text-muted uppercase tracking-wider">WhatsApp Business Account ID (WABA)</label>
            <input
              type="text"
              placeholder="e.g. 093248923489234 (Optional)"
              value={wabaId}
              onChange={(e) => setWabaId(e.target.value)}
              className="px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Permanent Access Token</label>
            <input
              required
              type="password"
              placeholder="EAAGy..."
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-foreground text-background text-xs font-semibold rounded hover:bg-neutral-800 disabled:bg-neutral-200 transition-all mt-2 active:scale-[0.98]"
          >
            {loading ? "Verifying Credentials..." : "Verify & Connect"}
          </button>
        </form>

        <div className="border-t border-border pt-4 flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-wider">
          <button
            onClick={() => {
              setPhoneNumber("+919999999999");
              setPhoneNumberId("test_id");
              setAccessToken("test_token");
              setWabaId("test_waba");
            }}
            className="hover:text-foreground transition-colors"
          >
            Use Demo Mock Number
          </button>
          <span>SECURE ENCRYPTED (SSL)</span>
        </div>
      </div>
    </div>
  );
}
