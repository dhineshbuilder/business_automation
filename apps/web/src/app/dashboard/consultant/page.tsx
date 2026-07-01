"use client";

import { useState } from "react";

export default function ConsultantPage() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [employees, setEmployees] = useState("");
  const [questions, setQuestions] = useState("");
  const [files, setFiles] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setPlan({
        score: 87,
        hoursSaved: 16.5,
        recommendations: [
          {
            title: "Automated Price Guide Dispatcher",
            desc: "Instantly reply to pricing queries with your latest catalog PDF, saving 6 hours per week.",
            difficulty: "Easy",
          },
          {
            title: "WhatsApp Calendar Auto-Booking",
            desc: "Let clients schedule appointments via native WhatsApp buttons connected directly to your calendar.",
            difficulty: "Medium",
          },
          {
            title: "CA Invoice Payment Trigger",
            desc: "Trigger payment reminders with inline PDF invoices to ca-clients automatically, improving cash flow by 30%.",
            difficulty: "Medium",
          },
        ],
      });
      setStep(4);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto flex flex-col gap-10">
      {/* Header */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">AI WORKSPACE CONSULTANT</span>
        <h1 className="font-serif text-3xl font-light tracking-tight mt-2">Hire Your AI Employee</h1>
        <p className="text-xs text-muted mt-1.5">
          Tell our consultant about your business operations, and we will build your customized automation workspace.
        </p>
      </div>

      {/* Wizard Card */}
      <div className="border border-border bg-white rounded-lg p-8">
        {step < 4 && (
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border text-[10px] font-mono text-muted uppercase tracking-wider">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% Complete</span>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">What business do you own?</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              >
                <option value="">Select industry...</option>
                <option value="restaurant">Restaurant & Food Outlet</option>
                <option value="clinic">Medical Clinic / Doctors</option>
                <option value="realestate">Real Estate & Property Developers</option>
                <option value="education">School / CA / Education Institute</option>
                <option value="ecommerce">E-Commerce & Retail Shop</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">How many employees do you have?</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!industry}
              className="w-full py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-200 transition-all active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">What are your top 3 repetitive inquiries?</label>
              <textarea
                rows={3}
                placeholder="e.g. Do you have appointments open today? What are your pricing packages? Where are you located?"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 text-xs font-semibold border border-border rounded hover:bg-neutral-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!questions}
                className="flex-1 py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-muted uppercase tracking-wider">What files do you copy-paste and send daily?</label>
              <textarea
                rows={3}
                placeholder="e.g. Catalog PDF, CA invoice templates, appointment form links"
                value={files}
                onChange={(e) => setFiles(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-2.5 text-xs font-semibold border border-border rounded hover:bg-neutral-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 py-2.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-neutral-800 disabled:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                {isGenerating ? "Analyzing Business Needs..." : "Generate Plan"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && plan && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Efficiency Score Card */}
            <div className="p-6 border border-neutral-900 bg-neutral-900 text-white rounded-lg flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">AUTOMATION BLUEPRINT READY</span>
                <h3 className="font-serif text-2xl font-light tracking-tight mt-1.5">Your Efficiency Score</h3>
              </div>
              <div className="text-right">
                <span className="text-3xl font-light tracking-tight text-emerald-400">{plan.score}/100</span>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono uppercase tracking-wider">Potential Savings: {plan.hoursSaved} hrs/wk</p>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-mono text-muted uppercase tracking-wider">Recommended Solutions</h4>
              {plan.recommendations.map((rec: any, index: number) => (
                <div key={index} className="p-4 border border-border bg-white rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all">
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold">{rec.title}</h5>
                    <p className="text-xs text-muted leading-relaxed mt-1">{rec.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-neutral-50 px-2 py-0.5 border border-border rounded">{rec.difficulty}</span>
                    <button
                      onClick={() => alert(`Deploying: ${rec.title}`)}
                      className="px-3 py-1.5 bg-foreground text-background font-semibold text-[10px] uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors"
                    >
                      Deploy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Re-Analyze Button */}
            <button
              onClick={() => {
                setStep(1);
                setIndustry("");
                setQuestions("");
                setFiles("");
                setPlan(null);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold border border-border rounded hover:bg-neutral-50 transition-colors"
            >
              Analyze Another Business
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
