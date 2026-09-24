"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  ShieldCheck,
  Copy,
  Check,
  HelpCircle,
  Sparkles,
  Award,
  SlidersHorizontal,
  Mail,
  BarChart2,
} from "lucide-react";

type PlatformId = "youtube" | "tiktok" | "instagram" | "x" | "newsletter";

// Crisp inline SVGs for brand logos to avoid version mismatches
const YoutubeIcon = () => (
  <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.28 8.28 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-slate-800 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface PlatformConfig {
  id: PlatformId;
  name: string;
  icon: React.ReactNode;
  baseCpmLow: number;
  baseCpmHigh: number;
  viewRatioDefault: number;
  unitLabel: string;
}

const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  youtube: {
    id: "youtube",
    name: "YouTube",
    icon: <YoutubeIcon />,
    baseCpmLow: 25,
    baseCpmHigh: 42,
    viewRatioDefault: 0.15,
    unitLabel: "Subscribers",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    icon: <TikTokIcon />,
    baseCpmLow: 10,
    baseCpmHigh: 22,
    viewRatioDefault: 0.2,
    unitLabel: "Followers",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    icon: <InstagramIcon />,
    baseCpmLow: 18,
    baseCpmHigh: 32,
    viewRatioDefault: 0.12,
    unitLabel: "Followers",
  },
  x: {
    id: "x",
    name: "X (Twitter)",
    icon: <XIcon />,
    baseCpmLow: 10,
    baseCpmHigh: 20,
    viewRatioDefault: 0.08,
    unitLabel: "Followers",
  },
  newsletter: {
    id: "newsletter",
    name: "Newsletter",
    icon: <Mail className="w-5 h-5 text-emerald-500" />,
    baseCpmLow: 30,
    baseCpmHigh: 55,
    viewRatioDefault: 0.45,
    unitLabel: "Subscribers (Opens)",
  },
};

const NICHES = [
  { id: "finance", name: "Personal Finance / Crypto / Investing", multiplier: 1.7 },
  { id: "tech", name: "Tech / AI / Software / SaaS", multiplier: 1.45 },
  { id: "business", name: "Business / Marketing / Career", multiplier: 1.3 },
  { id: "fitness", name: "Health / Fitness / Wellness", multiplier: 1.15 },
  { id: "beauty", name: "Beauty / Fashion / Lifestyle", multiplier: 1.0 },
  { id: "gaming", name: "Gaming / Esports", multiplier: 0.85 },
  { id: "entertainment", name: "Comedy / Memes / Entertainment", multiplier: 0.8 },
];

const DELIVERABLES = [
  { id: "dedicated", name: "Dedicated Video / Full Sponsorship", multiplier: 1.6, desc: "100% focused on sponsor" },
  { id: "integrated", name: "60s Integrated Segment (Standard)", multiplier: 1.0, desc: "Native mid-roll or section" },
  { id: "shoutout", name: "30s Shoutout / Quick Mention", multiplier: 0.65, desc: "Quick intro or verbal mention" },
  { id: "static", name: "Static Post / Carousel / Thread", multiplier: 0.5, desc: "Feed image or text post" },
  { id: "story", name: "Story Set (3 Frames) with Link", multiplier: 0.35, desc: "24h expiring story set" },
];

export default function Home() {
  const [platform, setPlatform] = useState<PlatformId>("youtube");
  const [followers, setFollowers] = useState<number>(35000);
  const [views, setViews] = useState<number>(6000);
  const [viewsManuallyEdited, setViewsManuallyEdited] = useState<boolean>(false);
  const [niche, setNiche] = useState<string>("tech");
  const [deliverable, setDeliverable] = useState<string>("integrated");
  const [brandName, setBrandName] = useState<string>("Acme Inc.");
  
  // Add-ons
  const [paidRights, setPaidRights] = useState<boolean>(false);
  const [exclusivity, setExclusivity] = useState<boolean>(false);
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);

  // Copy state
  const [copied, setCopied] = useState<boolean>(false);

  const handleFollowersChange = (val: number) => {
    setFollowers(val);
    if (!viewsManuallyEdited) {
      const defaultRatio = PLATFORMS[platform].viewRatioDefault;
      setViews(Math.round(val * defaultRatio));
    }
  };

  const handlePlatformChange = (p: PlatformId) => {
    setPlatform(p);
    if (!viewsManuallyEdited) {
      const defaultRatio = PLATFORMS[p].viewRatioDefault;
      setViews(Math.round(followers * defaultRatio));
    }
  };

  // Calculations
  const calculation = useMemo(() => {
    const pConfig = PLATFORMS[platform];
    const nicheObj = NICHES.find((n) => n.id === niche) || NICHES[0];
    const delivObj = DELIVERABLES.find((d) => d.id === deliverable) || DELIVERABLES[0];

    const effectiveUnits = views > 0 ? views : followers * pConfig.viewRatioDefault;
    const cpmFactor = effectiveUnits / 1000;

    // Direct dynamic calculation based on real CPM, niche, and deliverable multipliers
    const rawLow = cpmFactor * pConfig.baseCpmLow * nicheObj.multiplier * delivObj.multiplier;
    const rawHigh = cpmFactor * pConfig.baseCpmHigh * nicheObj.multiplier * delivObj.multiplier;

    // Only apply a tiny minimum baseline ($20) so small accounts don't show $0
    const baseLow = Math.max(rawLow, 20);
    const baseHigh = Math.max(rawHigh, 30);

    let addOnMultiplier = 1.0;
    if (paidRights) addOnMultiplier += 0.3;
    if (exclusivity) addOnMultiplier += 0.2;
    if (rushDelivery) addOnMultiplier += 0.25;

    const finalFloor = Math.max(15, Math.round((baseLow * 0.85 * addOnMultiplier) / 5) * 5);
    const finalTarget = Math.max(20, Math.round((((baseLow + baseHigh) / 2) * addOnMultiplier) / 5) * 5);
    const finalAnchor = Math.max(25, Math.round((baseHigh * 1.25 * addOnMultiplier) / 5) * 5);

    const effectiveCpm = views > 0 ? ((finalTarget / views) * 1000).toFixed(1) : "0.0";

    return {
      floor: finalFloor,
      target: finalTarget,
      anchor: finalAnchor,
      effectiveCpm,
      nicheMultiplier: nicheObj.multiplier,
      delivMultiplier: delivObj.multiplier,
    };
  }, [platform, followers, views, niche, deliverable, paidRights, exclusivity, rushDelivery]);

  const pitchEmailText = useMemo(() => {
    const targetBrand = brandName.trim() || "your team";
    const delivName = DELIVERABLES.find((d) => d.id === deliverable)?.name || "sponsorship";
    return `Hi ${targetBrand} team,

Thanks for reaching out! I'm a big fan of what you're building and would love to collaborate on a sponsored integration.

Based on our recent engagement metrics (~${views.toLocaleString()} average views on ${PLATFORMS[platform].name}), my standard rate for a ${delivName} is $${calculation.target.toLocaleString()}.

This includes:
• Dedicated script drafting aligned with your campaign KPIs
• Native integration matching my channel's editorial tone
• 1 round of revision and 30-day link placement
${paidRights ? "• 30-day paid social ad usage rights included\n" : ""}${exclusivity ? "• 30-day category exclusivity\n" : ""}
Please let me know if this aligns with your budget and we can lock in the timeline for next week.

Best regards,
[Your Name / Channel]`;
  }, [brandName, deliverable, views, platform, calculation.target, paidRights, exclusivity]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchEmailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <DollarSign className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">InfluencerRate</span>
              <span className="text-indigo-600 font-bold text-lg">Calc</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free & Private (Runs in Browser)
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12 w-full space-y-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" /> 2026 Updated Creator Economy Benchmarks
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Much Should You Charge for a Sponsored Post?
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Stop undercharging brands. Calculate fair market sponsorship rates across YouTube, TikTok, Instagram, and X based on real CPM benchmarks and your exact niche.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <span>Campaign Parameters</span>
              </div>
              <span className="text-xs text-slate-500">Step 1 of 2</span>
            </div>

            {/* Platform Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Select Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {(Object.keys(PLATFORMS) as PlatformId[]).map((key) => {
                  const p = PLATFORMS[key];
                  const active = platform === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handlePlatformChange(key)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                        active
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-sm ring-2 ring-indigo-500/20"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                      }`}
                    >
                      {p.icon}
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Metrics Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Followers */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{PLATFORMS[platform].unitLabel}</span>
                  <span className="font-mono text-indigo-600 font-bold">{followers.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="500"
                  placeholder="0"
                  value={followers === 0 ? "" : followers}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/^0+(?=\d)/, "");
                    handleFollowersChange(raw === "" ? 0 : parseInt(raw, 10) || 0);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <div className="flex gap-1 pt-1">
                  {[10000, 50000, 100000, 500000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleFollowersChange(preset)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    >
                      {(preset / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Average Views */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Average Views / Impressions</span>
                  <span className="font-mono text-indigo-600 font-bold">{views.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="500"
                  placeholder="0"
                  value={views === 0 ? "" : views}
                  onChange={(e) => {
                    setViewsManuallyEdited(true);
                    const raw = e.target.value.replace(/^0+(?=\d)/, "");
                    setViews(raw === "" ? 0 : parseInt(raw, 10) || 0);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-500 pt-1">
                  Brands pay based on actual views, not vanity follower numbers.
                </p>
              </div>
            </div>

            {/* Niche & Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Your Content Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {NICHES.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} (CPM multiplier: {n.multiplier}x)
                  </option>
                ))}
              </select>
            </div>

            {/* Deliverable Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Sponsorship Deliverable</label>
              <div className="space-y-2">
                {DELIVERABLES.map((d) => {
                  const isSelected = deliverable === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDeliverable(d.id)}
                      className={`w-full text-left flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{d.name}</div>
                        <div className="text-xs text-slate-500">{d.desc}</div>
                      </div>
                      <div
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "text-indigo-700 bg-indigo-100/60"
                        }`}
                      >
                        {d.multiplier}x
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Add-ons */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="text-sm font-semibold text-slate-700">Contract Add-ons & Rights</label>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paidRights}
                    onChange={(e) => setPaidRights(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>30-Day Paid Ad Usage Rights / Whitelisting (+30%)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exclusivity}
                    onChange={(e) => setExclusivity(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>30-Day Direct Competitor Exclusivity (+20%)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>48-Hour Rush Turnaround (+25%)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Results Right Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Rates Card */}
            <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Recommended Pricing</span>
                </div>
                <div className="text-xs text-slate-400">
                  Est. CPM: <span className="text-indigo-300 font-bold">${calculation.effectiveCpm}</span>
                </div>
              </div>

              {/* Active Multipliers Badges */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                <span>Niche: <strong>{calculation.nicheMultiplier}x</strong></span>
                <span>•</span>
                <span>Format: <strong>{calculation.delivMultiplier}x</strong></span>
              </div>

              {/* Main Target Price */}
              <div className="text-center py-2 space-y-1">
                <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                  Target Fair Rate (Quote This)
                </span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  ${calculation.target.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">
                  Standard quote for your Media Kit and initial brand proposals.
                </p>
              </div>

              {/* Range Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xs text-slate-400">Floor Rate (Walk Away)</div>
                  <div className="text-lg font-bold text-emerald-400">
                    ${calculation.floor.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Don’t go below this</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xs text-slate-400">Anchor Rate (Premium)</div>
                  <div className="text-lg font-bold text-amber-400">
                    ${calculation.anchor.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">For deep-pocketed brands</div>
                </div>
              </div>

              {/* Brand Name Input for Pitch */}
              <div className="space-y-1 pt-2">
                <label className="text-xs text-slate-300">Brand Name (Optional, for email script):</label>
                <input
                  type="text"
                  placeholder="e.g. Notion, NordVPN, Shopify"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* Copy Pitch Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Pitch Email Script"}</span>
              </button>
            </div>

            {/* Email Preview Snippet */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>Email Script Preview:</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Ready to paste</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 max-h-40 overflow-y-auto leading-relaxed">
                {pitchEmailText}
              </pre>
            </div>
          </div>
        </div>

        {/* 2026 Industry Benchmark Table */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <BarChart2 className="w-4 h-4" /> 2026 Industry Rates Table
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Average Creator Sponsorship Pricing by Tier
            </h2>
            <p className="text-sm text-slate-600">
              Industry standard estimates for single 60s integrations or sponsored posts across major platforms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase bg-slate-50/50">
                  <th className="py-3 px-4 font-semibold">Tier</th>
                  <th className="py-3 px-4 font-semibold">Audience Size</th>
                  <th className="py-3 px-4 font-semibold">YouTube (Dedicated/Integ.)</th>
                  <th className="py-3 px-4 font-semibold">TikTok / Reels</th>
                  <th className="py-3 px-4 font-semibold">Typical Base CPM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Nano-Creator</td>
                  <td className="py-3 px-4 text-slate-500">1K – 10K</td>
                  <td className="py-3 px-4 font-mono">$100 – $400</td>
                  <td className="py-3 px-4 font-mono">$50 – $200</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">$20 – $40</td>
                </tr>
                <tr className="bg-slate-50/30">
                  <td className="py-3 px-4 font-medium text-slate-900">Micro-Creator</td>
                  <td className="py-3 px-4 text-slate-500">10K – 50K</td>
                  <td className="py-3 px-4 font-mono">$400 – $1,800</td>
                  <td className="py-3 px-4 font-mono">$200 – $800</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">$25 – $45</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Mid-Tier</td>
                  <td className="py-3 px-4 text-slate-500">50K – 250K</td>
                  <td className="py-3 px-4 font-mono">$1,800 – $6,500</td>
                  <td className="py-3 px-4 font-mono">$800 – $2,500</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">$25 – $50</td>
                </tr>
                <tr className="bg-slate-50/30">
                  <td className="py-3 px-4 font-medium text-slate-900">Macro-Creator</td>
                  <td className="py-3 px-4 text-slate-500">250K – 1M</td>
                  <td className="py-3 px-4 font-mono">$6,500 – $20,000</td>
                  <td className="py-3 px-4 font-mono">$2,500 – $8,000</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">$30 – $60</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Mega / Celebrity</td>
                  <td className="py-3 px-4 text-slate-500">1M+</td>
                  <td className="py-3 px-4 font-mono">$20,000+</td>
                  <td className="py-3 px-4 font-mono">$8,000+</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">$35 – $75+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO FAQ Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" /> Creator Brand Deal FAQs
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Frequently Asked Questions About Sponsorship Rates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-base">
                How do brands calculate what they are willing to pay?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Brand marketers evaluate creator deals primarily on <strong>expected impressions (CPM)</strong> and estimated conversions (CPA). They look at your last 10–20 posts to gauge consistent median views rather than viral outlier hits. High-intent niches like SaaS and B2B pay significantly higher CPMs because their customer lifetime value is higher.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-base">
                What should I do if a brand offers only free products (gifting)?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unless you have under 1,000 followers and genuinely desire the item, treat unpaid gifted collabs as barter transactions. Politely reply with: <em>“Thank you! I only produce dedicated content for paid partners. Here is my media kit and rate card if you’d like to explore a sponsored campaign.”</em>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-base">
                What are usage rights and ad whitelisting?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Organic sponsorship allows your video to sit on your feed. If a brand wants to use your video as a paid ad (TikTok Spark Ad, Meta ad, or YouTube ad), they are extracting additional commercial value from your face and credibility. Standard industry practice is to charge an additional <strong>30% to 50% fee</strong> for 30–60 days of ad usage.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-base">
                Should I charge a flat fee or performance/affiliate?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never accept purely performance-based deals from unproven brands unless the commission percentage is high and the product has proven conversion rates. The safest setup is a <strong>guaranteed base fee + affiliate bonus</strong> per sale, ensuring your production time is covered regardless of the brand’s checkout funnel.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>© 2026 InfluencerRateCalc. Built for creators and independent publishers worldwide.</p>
          <p className="text-slate-400">
            Rates provided are estimates based on aggregated industry medians and CPM averages. Actual deal pricing may vary based on engagement, exclusivity, and seasonality.
          </p>
        </div>
      </footer>
    </div>
  );
}
