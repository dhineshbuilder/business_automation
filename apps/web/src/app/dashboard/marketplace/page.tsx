"use client";

import { useState } from "react";

export default function MarketplacePage() {
  const [deployed, setDeployed] = useState<string[]>([]);
  const [deploying, setDeploying] = useState<string | null>(null);

  const packs = [
    {
      id: "restaurant",
      title: "Restaurant Starter Pack",
      desc: "Autopilot menu dispatch cards, reservation request forms, and automated Google review requests.",
      efficiency: "+12 hrs/wk",
      nodes: 3,
    },
    {
      id: "clinic",
      title: "Clinic Reception Pack",
      desc: "Patients check availability, confirm appointments, and automatically receive appointment reminders.",
      efficiency: "+15 hrs/wk",
      nodes: 4,
    },
    {
      id: "billing",
      title: "CA & Invoice Automation Pack",
      desc: "Send CA invoice reminders, verify transaction receipts, and log updates to your client portal.",
      efficiency: "+8 hrs/wk",
      nodes: 2,
    },
    {
      id: "estate",
      title: "Real Estate Brochure Pack",
      desc: "Instantly trigger brochures on inbound property inquiries and forward warm leads to listing agents.",
      efficiency: "+10 hrs/wk",
      nodes: 3,
    },
  ];

  const handleDeploy = (id: string) => {
    setDeploying(id);
    setTimeout(() => {
      setDeploying(null);
      setDeployed([...deployed, id]);
    }, 1200);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto flex flex-col gap-10">
      {/* Header */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">SOLUTIONS MARKETPLACE</span>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight mt-2">One-Click Business Solutions</h1>
        <p className="text-xs text-muted mt-1.5">
          Deploy complete, outcome-driven automation modules to eliminate repetitive communication in one click.
        </p>
      </div>

      {/* Solutions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="p-6 border border-border bg-white rounded-lg flex flex-col justify-between h-[240px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all"
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold">{pack.title}</h3>
                <span className="font-mono text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                  {pack.efficiency}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mt-2 max-w-sm">
                {pack.desc}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border mt-4">
              <span className="font-mono text-[9px] text-muted uppercase tracking-wider">
                {pack.nodes} Automation Nodes
              </span>
              <button
                onClick={() => handleDeploy(pack.id)}
                disabled={deploying !== null || deployed.includes(pack.id)}
                className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 transition-all active:scale-[0.98]"
              >
                {deploying === pack.id
                  ? "Deploying Plan..."
                  : deployed.includes(pack.id)
                  ? "Deployed ✓"
                  : "Deploy Solution"}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
