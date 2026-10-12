'use client';

import React, { useState } from 'react';

interface NicheConfig {
  name: string;
  lowCpm: number;
  medCpm: number;
  highCpm: number;
}

const NICHES: Record<string, NicheConfig> = {
  finance: { name: 'Finance, Crypto & Investing', lowCpm: 45, medCpm: 60, highCpm: 85 },
  tech: { name: 'B2B SaaS, Software & Developer Tools', lowCpm: 35, medCpm: 50, highCpm: 70 },
  health: { name: 'Health, Wellness & Supplements', lowCpm: 25, medCpm: 38, highCpm: 50 },
  education: { name: 'Education, Productivity & Careers', lowCpm: 28, medCpm: 40, highCpm: 55 },
  lifestyle: { name: 'Lifestyle, Beauty & Fashion', lowCpm: 18, medCpm: 28, highCpm: 40 },
  gaming: { name: 'Gaming, Esports & Entertainment', lowCpm: 12, medCpm: 20, highCpm: 30 },
};

const FORMATS: Record<string, { name: string; multiplier: number; desc: string }> = {
  midroll: { name: '30-60s Integrated Mid-Roll', multiplier: 1.0, desc: 'Standard integrated sponsor segment within main video' },
  preroll: { name: '15-30s Pre-Roll Shoutout', multiplier: 0.65, desc: 'Brief opening verbal mention before main content begins' },
  dedicated: { name: 'Full Dedicated Video', multiplier: 2.75, desc: 'Entire video focused exclusively on the product or brand' },
};

const RIGHTS: Record<string, { name: string; multiplier: number; desc: string }> = {
  organic: { name: 'Organic Video Only', multiplier: 1.0, desc: 'No paid ad amplification rights included' },
  whitelist30: { name: '30-Day Paid Whitelisting', multiplier: 1.3, desc: 'Brand can run dark ads through creator handle for 30 days' },
  whitelist90: { name: '90-Day Paid Whitelisting', multiplier: 1.6, desc: 'Extended 90-day advertising usage rights across Meta/TikTok/YT' },
};

export default function YouTubeRateCalculator() {
  const [subscribers, setSubscribers] = useState<number>(100000);
  const [views, setViews] = useState<number>(15000);
  const [niche, setNiche] = useState<string>('tech');
  const [format, setFormat] = useState<string>('midroll');
  const [rights, setRights] = useState<string>('organic');
  const [autoViews, setAutoViews] = useState<boolean>(true);

  const handleSubChange = (newSubs: number) => {
    setSubscribers(newSubs);
    if (autoViews) {
      setViews(Math.round(newSubs * 0.15));
    }
  };

  const selectedNiche = NICHES[niche];
  const selectedFormat = FORMATS[format];
  const selectedRights = RIGHTS[rights];

  const totalMultiplier = selectedFormat.multiplier * selectedRights.multiplier;

  const lowFee = Math.round((views / 1000) * selectedNiche.lowCpm * totalMultiplier);
  const medFee = Math.round((views / 1000) * selectedNiche.medCpm * totalMultiplier);
  const highFee = Math.round((views / 1000) * selectedNiche.highCpm * totalMultiplier);

  const effectiveCpm = Math.round((medFee / (views || 1)) * 1000);
  const estClicksLow = Math.round(views * 0.006);
  const estClicksHigh = Math.round(views * 0.016);
  const estBreakevenCpc = estClicksLow > 0 ? (medFee / estClicksLow).toFixed(2) : '0.00';

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-4 sm:p-8 shadow-xl w-full max-w-full min-w-0 box-border my-8">
      <div className="border-b border-slate-800 pb-5 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>YouTube Sponsorship Rate Calculator</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Calculate expected pricing and CPM benchmarks based on channel metrics, vertical value, and contract terms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          {/* Subscribers */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-300">Channel Subscribers</label>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded">
                {subscribers.toLocaleString()} subs
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="1000000"
              step="5000"
              value={subscribers}
              onChange={(e) => handleSubChange(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              aria-label="Subscriber count slider"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5k (Nano)</span>
              <span>100k (Mid-Tier)</span>
              <span>500k (Macro)</span>
              <span>1M+ (Hero)</span>
            </div>
          </div>

          {/* Average Views */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-300">Expected Views Per Video (30-Day Avg)</label>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-2.5 py-1 rounded">
                {views.toLocaleString()} views
              </span>
            </div>
            <input
              type="number"
              min="500"
              max="2000000"
              value={views}
              onChange={(e) => {
                setAutoViews(false);
                setViews(Math.max(100, Number(e.target.value)));
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              aria-label="Average views input"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="auto-views"
                checked={autoViews}
                onChange={(e) => {
                  setAutoViews(e.target.checked);
                  if (e.target.checked) setViews(Math.round(subscribers * 0.15));
                }}
                className="accent-emerald-500 rounded cursor-pointer"
              />
              <label htmlFor="auto-views" className="text-xs text-slate-400 cursor-pointer">
                Auto-estimate at 15% view-to-subscriber ratio
              </label>
            </div>
          </div>

          {/* Content Niche */}
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-300 block mb-2">Content Niche / Vertical</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
              aria-label="Content Niche selector"
            >
              {Object.entries(NICHES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name} (CPM: ${val.lowCpm} - ${val.highCpm})
                </option>
              ))}
            </select>
          </div>

          {/* Placement Format */}
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-300 block mb-2">Sponsorship Format</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(FORMATS).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormat(key)}
                  className={`p-3 rounded-lg border text-left text-xs transition ${
                    format === key
                      ? 'border-emerald-500 bg-emerald-950/40 text-white font-bold'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div>{val.name}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{val.multiplier}x base</div>
                </button>
              ))}
            </div>
          </div>

          {/* Commercial Rights */}
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-300 block mb-2">Paid Media Rights / Whitelisting</label>
            <select
              value={rights}
              onChange={(e) => setRights(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
              aria-label="Commercial rights selector"
            >
              {Object.entries(RIGHTS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name} ({val.multiplier}x) &mdash; {val.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Column */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-2.5 py-0.5 rounded-full">
              Estimated Sponsorship Range
            </span>

            <div className="mt-4 mb-6">
              <div className="text-3xl sm:text-4xl font-black text-white">
                ${medFee.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Suggested median rate (${lowFee.toLocaleString()} &ndash; ${highFee.toLocaleString()} fair market window)
              </div>
            </div>

            {/* Key Metrics Breakdown */}
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Effective View CPM:</span>
                <span className="font-mono font-bold text-slate-200">${effectiveCpm} / 1k views</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Est. Tracked Link Clicks (0.6% - 1.6%):</span>
                <span className="font-mono font-bold text-slate-200">
                  {estClicksLow.toLocaleString()} &ndash; {estClicksHigh.toLocaleString()} clicks
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Implied Breakeven CPC (Low traffic):</span>
                <span className="font-mono font-bold text-amber-400">${estBreakevenCpc} / click</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Channel Niche Benchmark CPM:</span>
                <span className="font-mono text-slate-300">
                  ${selectedNiche.lowCpm} &ndash; ${selectedNiche.highCpm}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <strong>Media Buyer Insight:</strong> Never contract rates purely on subscriber count. A channel with 100k subscribers averaging 5,000 views has an effective view value of ~$250, whereas a 50k channel averaging 40,000 views warrants upwards of $2,000 in technical niches.
          </div>
        </div>
      </div>
    </div>
  );
}
