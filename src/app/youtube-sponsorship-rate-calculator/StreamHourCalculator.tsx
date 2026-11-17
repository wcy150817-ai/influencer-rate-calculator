'use client';

import React, { useState } from 'react';

const PLATFORMS: Record<string, { name: string; note: string }> = {
  ytlive: { name: 'YouTube Live', note: 'Live streams also keep a replay on the channel, so ask whether the sponsor wants the replay segment included.' },
  twitch: { name: 'Twitch', note: 'Twitch VODs expire on a schedule set by Twitch, so confirm how long the sponsor message needs to stay available.' },
  kick: { name: 'Kick', note: 'Check the platform terms for how sponsored segments and replays are handled.' },
};

export default function StreamHourCalculator() {
  const [platform, setPlatform] = useState<string>('ytlive');
  const [ccv, setCcv] = useState<number>(300);
  const [hours, setHours] = useState<number>(3);
  const [rate, setRate] = useState<number>(35);
  const [mentions, setMentions] = useState<number>(3);
  const [vodRights, setVodRights] = useState<boolean>(false);

  const safeCcv = Math.max(0, ccv || 0);
  const safeHours = Math.max(0, hours || 0);
  const safeRate = Math.max(0, rate || 0);
  const viewerHours = safeCcv * safeHours;
  const baseFee = (viewerHours / 1000) * safeRate;
  const mentionFactor = 1 + Math.max(0, (mentions || 1) - 1) * 0.1;
  const vodFactor = vodRights ? 1.25 : 1;
  const fee = baseFee * mentionFactor * vodFactor;
  const perMention = mentions > 0 ? fee / mentions : fee;
  const perHour = safeHours > 0 ? fee / safeHours : 0;

  const field = 'w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none';
  const label = 'text-xs font-bold text-slate-300 block mb-1.5';

  return (
    <div className="bg-slate-900 border border-emerald-800/70 text-slate-100 rounded-2xl p-4 sm:p-8 shadow-xl w-full max-w-full min-w-0 box-border my-8">
      <h2 className="text-xl sm:text-2xl font-black text-white">Live Stream Hour Calculator: YouTube Live, Twitch &amp; Kick</h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        Price a sponsored live stream from average concurrent viewers (CCV) and hours streamed. The cost per 1,000 viewer-hours is a planning assumption you set, not a published benchmark.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label htmlFor="slPlatform" className={label}>Platform</label>
          <select id="slPlatform" className={field} value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {Object.entries(PLATFORMS).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="slCcv" className={label}>Average concurrent viewers (CCV)</label>
          <input id="slCcv" type="number" min={0} max={200000} step={10} className={field} value={ccv} onChange={(e) => setCcv(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label htmlFor="slHours" className={label}>Hours streamed with the sponsor active</label>
          <input id="slHours" type="number" min={0} max={24} step={0.5} className={field} value={hours} onChange={(e) => setHours(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label htmlFor="slRate" className={label}>Your cost per 1,000 viewer-hours ($)</label>
          <input id="slRate" type="number" min={0} max={1000} step={1} className={field} value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label htmlFor="slMentions" className={label}>Number of on-stream mentions</label>
          <input id="slMentions" type="number" min={1} max={20} step={1} className={field} value={mentions} onChange={(e) => setMentions(parseFloat(e.target.value) || 1)} />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input id="slVod" type="checkbox" className="accent-emerald-500" checked={vodRights} onChange={(e) => setVodRights(e.target.checked)} />
            Include replay / VOD rights (+25% in this model)
          </label>
        </div>
      </div>
      <button
        id="slCalcBtn"
        type="button"
        onClick={() => setCcv((v) => v)}
        data-qa="color: #ffffff !important"
        style={{ backgroundColor: '#059669', color: '#ffffff' }}
        className="mt-5 px-5 py-2.5 rounded-xl font-bold text-sm"
      >
        Calculate Stream Sponsorship Fee
      </button>
      <div id="slResult" className="mt-5 bg-slate-950 border border-slate-800 rounded-xl p-5 text-sm text-slate-200">
        <p className="text-3xl font-black text-white">${Math.round(fee).toLocaleString()}</p>
        <p className="mt-2">
          {viewerHours.toLocaleString()} viewer-hours ({safeCcv.toLocaleString()} CCV &times; {safeHours} h) at ${safeRate} per 1,000 = ${Math.round(baseFee).toLocaleString()} base. Mention factor {mentionFactor.toFixed(2)}x, replay factor {vodFactor.toFixed(2)}x.
        </p>
        <p className="mt-2">About ${Math.round(perMention).toLocaleString()} per mention and ${Math.round(perHour).toLocaleString()} per streamed hour. {PLATFORMS[platform].note}</p>
        <p className="mt-2 text-xs text-slate-500">Illustrative model. The mention and replay factors are simple assumptions you can adjust in your own negotiation.</p>
      </div>
    </div>
  );
}
