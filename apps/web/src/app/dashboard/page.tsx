"use client";

import { useEffect, useState } from "react";

interface LogItem {
  id: string;
  event: string;
  detail: string;
  time: string;
}

interface StatsData {
  hoursSaved: number;
  paymentsCollected: number;
  revenueInfluenced: number;
  efficiencyScore: number;
  contactCount: number;
  workflowCount: number;
  messageCount: number;
  logs: LogItem[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    hoursSaved: 14.5,
    paymentsCollected: 1290.00,
    revenueInfluenced: 3842.00,
    efficiencyScore: 94,
    contactCount: 86,
    workflowCount: 4,
    messageCount: 87,
    logs: [
      { id: "1", event: "AI Auto-Reply sent", detail: 'Inbound: "what are your prices?"', time: new Date().toISOString() },
      { id: "2", event: "CRM tag added: Warm", detail: 'Inbound: "book an appointment"', time: new Date().toISOString() },
      { id: "3", event: "Broadcast complete", detail: 'Campaign: "Summer Launch"', time: new Date().toISOString() }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/dashboard/stats")
      .then((res) => {
        if (!res.ok) throw new Error("API response error");
        return res.json();
      })
      .then((data) => {
        // Only override if data structure matches
        if (data && typeof data.hoursSaved === "number") {
          setStats(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load live DB stats, rendering offline mock profile.", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-[1200px] mx-auto flex flex-col gap-10">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">BUSINESS HEALTH MONITOR</span>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight mt-2">Operational Health</h1>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider">
            <div className="w-3.5 h-3.5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
            <span>Syncing DB...</span>
          </div>
        )}
      </div>

      {/* Primary Metrics Grid (Outcomes) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 border border-border bg-white rounded flex flex-col gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Hours Saved Today</span>
          <span className="text-2xl font-light tracking-tight mt-1">
            {stats.hoursSaved.toFixed(1)} <span className="text-sm text-muted">hrs</span>
          </span>
        </div>

        <div className="p-6 border border-border bg-white rounded flex flex-col gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Payments Collected</span>
          <span className="text-2xl font-light tracking-tight mt-1">
            ${stats.paymentsCollected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-6 border border-border bg-white rounded flex flex-col gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Automated Rev. Influenced</span>
          <span className="text-2xl font-light tracking-tight mt-1">
            ${stats.revenueInfluenced.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-6 border border-border bg-white rounded flex flex-col gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Efficiency Score</span>
          <span className="text-2xl font-light tracking-tight mt-1">{stats.efficiencyScore}/100</span>
        </div>
      </section>

      {/* AI Recommendation Engine Panel */}
      <section className="p-8 border border-neutral-900 bg-neutral-900 text-white rounded-lg flex flex-col justify-between hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">AI Recommendation Engine</span>
          <h2 className="font-serif text-2xl font-light tracking-tight mb-4">Continuous Automation Optimization</h2>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {/* Card 1 */}
          <div className="p-4 border border-neutral-800 bg-neutral-800/40 rounded flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>
                You manually sent your price list / brochure <strong className="text-white">48 times</strong> this week.
              </span>
            </div>
            <button
              onClick={() => alert("Deploying brochure dispatch automation")}
              className="px-3 py-1.5 bg-white text-neutral-950 font-semibold text-[10px] uppercase tracking-wider rounded hover:bg-neutral-100 transition-colors shrink-0"
            >
              Enable Automation
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-4 border border-neutral-800 bg-neutral-800/40 rounded flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>
                You missed following up with <strong className="text-white">29 inbound leads</strong> over the weekend.
              </span>
            </div>
            <button
              onClick={() => alert("Enabling Lead follow-up sequence")}
              className="px-3 py-1.5 bg-white text-neutral-950 font-semibold text-[10px] uppercase tracking-wider rounded hover:bg-neutral-100 transition-colors shrink-0"
            >
              Configure Auto-Follow
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-4 border border-neutral-800 bg-neutral-800/40 rounded flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <span>
                Inbound queries repeatedly ask about <strong className="text-white">"pricing"</strong>.
              </span>
            </div>
            <button
              onClick={() => alert("Enabling Pricing FAQ automation")}
              className="px-3 py-1.5 bg-white text-neutral-950 font-semibold text-[10px] uppercase tracking-wider rounded hover:bg-neutral-100 transition-colors shrink-0"
            >
              Deploy FAQ Node
            </button>
          </div>
        </div>
      </section>

      {/* Operational Activities Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Number Health Card */}
        <div className="lg:col-span-4 p-8 border border-border bg-white rounded flex flex-col justify-between h-[320px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <div>
            <h2 className="text-base font-semibold mb-1">WhatsApp API Channel</h2>
            <p className="text-xs text-muted leading-relaxed">System integration parameters and pipeline status checks.</p>
            
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Connection Status</span>
                <span className="font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-semibold">CONNECTED</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Meta Quality Rating</span>
                <span className="font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-semibold">HIGH</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Rate Limit Tier</span>
                <span className="font-mono text-neutral-800 text-[10px] font-semibold">Tier 1 (1k/day)</span>
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase text-muted tracking-wider">SYSTEM CHANNEL 01</span>
        </div>

        {/* Right Column: Active Automations Log */}
        <div className="lg:col-span-8 p-8 border border-border bg-white rounded flex flex-col justify-between h-[320px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
          <div>
            <h2 className="text-base font-semibold mb-1">Recent Automated Events</h2>
            <p className="text-xs text-muted leading-relaxed">Review logs generated by natural language automation nodes.</p>

            <div className="mt-6 flex flex-col gap-3">
              {stats.logs.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted font-mono uppercase tracking-wider">
                  No events logged in the database yet
                </div>
              ) : (
                stats.logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-2 border border-border rounded bg-neutral-50/50 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-mono font-medium">{log.detail}</span>
                    </div>
                    <span className="font-mono text-muted text-[10px]">{log.event}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase text-muted tracking-wider">LOG EVENT BUFFER</span>
        </div>
      </section>
    </div>
  );
}
