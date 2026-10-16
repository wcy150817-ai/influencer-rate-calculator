"use client";

import React, { useState } from "react";
import { Calculator, TrendingDown, DollarSign, Users, Target, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function B2BNativeFunnelCalc() {
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [cpc, setCpc] = useState<number>(1.25);
  const [preLanderCvr, setPreLanderCvr] = useState<number>(4.5);
  const [leadToSql, setLeadToSql] = useState<number>(15.0);
  const [sqlToDeal, setSqlToDeal] = useState<number>(20.0);
  const [acv, setAcv] = useState<number>(7200);

  // Math
  const clicks = Math.round(adSpend / Math.max(0.1, cpc));
  const leads = Math.round(clicks * (preLanderCvr / 100));
  const sqls = Math.round(leads * (leadToSql / 100));
  const deals = Math.max(0, Math.round(sqls * (sqlToDeal / 100)));
  const cac = deals > 0 ? Math.round(adSpend / deals) : adSpend;
  const ltvCacRatio = (acv / Math.max(1, cac)).toFixed(2);
  const costPerLead = leads > 0 ? (adSpend / leads).toFixed(2) : "N/A";
  const costPerSql = sqls > 0 ? (adSpend / sqls).toFixed(2) : "N/A";

  let statusText = "Fatal Unit Economics: Native CAC Exceeds ACV";
  let statusColor = "#f87171";
  let statusBadge = "Unviable B2B Native Funnel";

  const ratioNum = parseFloat(ltvCacRatio);
  if (ratioNum >= 3.0 && deals >= 1) {
    statusText = "Profitable B2B Native Arbitrage (Healthy >3x LTV:CAC)";
    statusColor = "#4ade80";
    statusBadge = "Scalable Enterprise Unit Economics";
  } else if (ratioNum >= 1.5 && deals >= 1) {
    statusText = "Marginal Payback: Requires Pre-Lander Conversion Optimization";
    statusColor = "#fbbf24";
    statusBadge = "Borderline Commercial Viability";
  }

  return (
    <div className="my-10 bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 text-slate-100 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">B2B Native Funnel Conversion &amp; CAC Calculator</h3>
          <p className="text-sm text-slate-400">Simulate traffic decay from native ad click to closed-won B2B SaaS contract.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <div>
          <label htmlFor="calcInputSpend" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Monthly Native Budget ($ USD): <span className="text-indigo-400 font-bold text-sm">${adSpend.toLocaleString()}</span>
          </label>
          <input
            id="calcInputSpend"
            type="number"
            min={1000}
            max={200000}
            step={500}
            value={adSpend}
            onChange={(e) => setAdSpend(Math.max(500, parseInt(e.target.value) || 500))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="calcInputCpc" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Target Native CPC ($ USD): <span className="text-indigo-400 font-bold text-sm">${cpc.toFixed(2)}</span>
          </label>
          <input
            id="calcInputCpc"
            type="number"
            min={0.2}
            max={10.0}
            step={0.05}
            value={cpc}
            onChange={(e) => setCpc(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="calcInputPreCvr" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Pre-Lander to Lead CVR (%): <span className="text-indigo-400 font-bold text-sm">{preLanderCvr}%</span>
          </label>
          <input
            id="calcInputPreCvr"
            type="number"
            min={0.5}
            max={30.0}
            step={0.1}
            value={preLanderCvr}
            onChange={(e) => setPreLanderCvr(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="calcInputLeadToSql" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Lead-to-SQL Rate (%): <span className="text-indigo-400 font-bold text-sm">{leadToSql}%</span>
          </label>
          <input
            id="calcInputLeadToSql"
            type="number"
            min={1.0}
            max={60.0}
            step={0.5}
            value={leadToSql}
            onChange={(e) => setLeadToSql(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="calcInputSqlToDeal" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            SQL-to-Closed-Won Win Rate (%): <span className="text-indigo-400 font-bold text-sm">{sqlToDeal}%</span>
          </label>
          <input
            id="calcInputSqlToDeal"
            type="number"
            min={1.0}
            max={75.0}
            step={0.5}
            value={sqlToDeal}
            onChange={(e) => setSqlToDeal(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="calcInputAcv" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Customer Contract ACV ($ USD): <span className="text-indigo-400 font-bold text-sm">${acv.toLocaleString()}</span>
          </label>
          <input
            id="calcInputAcv"
            type="number"
            min={500}
            max={100000}
            step={500}
            value={acv}
            onChange={(e) => setAcv(Math.max(100, parseInt(e.target.value) || 100))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 sm:p-6 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-slate-700 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Funnel Economics Status</div>
            <div className="text-lg font-bold" id="dispCalcStatus" style={{ color: statusColor }}>{statusText}</div>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-600 text-slate-300">
            {statusBadge}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-700 text-center">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">Native Clicks</div>
            <div className="text-xl font-extrabold text-white" id="dispCalcClicks">{clicks.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 mt-1">@ ${cpc.toFixed(2)} CPC</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">Captured Leads</div>
            <div className="text-xl font-extrabold text-white" id="dispCalcLeads">{leads.toLocaleString()}</div>
            <div className="text-[10px] text-indigo-300 mt-1">${costPerLead} CPL</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">Qualified SQLs</div>
            <div className="text-xl font-extrabold text-white" id="dispCalcSqls">{sqls.toLocaleString()}</div>
            <div className="text-[10px] text-indigo-300 mt-1">${costPerSql} CPSQL</div>
          </div>
          <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-500/30">
            <div className="text-xs text-indigo-400 font-semibold mb-1">Closed-Won Deals</div>
            <div className="text-2xl font-extrabold text-white" id="dispCalcDeals">{deals}</div>
            <div className="text-[10px] text-emerald-300 mt-1 font-semibold">{ltvCacRatio}x LTV:CAC</div>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Effective Blended CAC</div>
            <div className="text-2xl font-extrabold text-indigo-400" id="dispCalcCac">
              ${cac.toLocaleString()} <span className="text-xs font-normal text-slate-400">per acquired customer</span>
            </div>
          </div>
          <a
            href="https://pbee.me/T21h0LEr7"
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-style="color:#ffffff !important"
            style={{ color: "#ffffff" }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-900/30 whitespace-nowrap w-full sm:w-auto"
          >
            Hire Native Pre-Lander Copywriters on Fiverr &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
