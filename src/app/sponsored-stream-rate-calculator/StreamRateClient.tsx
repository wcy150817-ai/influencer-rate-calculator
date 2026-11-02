'use client';

import { useMemo, useState } from "react";

type Deliverable = "overlay" | "mentions" | "segment" | "full";

const DELIVERABLES: { id: Deliverable; label: string; mult: number; note: string }[] = [
  { id: "overlay", label: "Logo / overlay only (no talking points)", mult: 0.5, note: "Passive placement: a banner, panel or corner logo on screen." },
  { id: "mentions", label: "Overlay + verbal mentions (about once an hour)", mult: 1, note: "The most common live-stream package: talking points read on stream." },
  { id: "segment", label: "Dedicated segment (product shown and explained)", mult: 1.5, note: "A planned block where the product is demonstrated or played." },
  { id: "full", label: "Fully sponsored stream (brand-chosen game or theme)", mult: 2, note: "The whole broadcast is built around the sponsor." },
];

function money(n: number) {
  if (!isFinite(n)) return "$0";
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function StreamRateClient() {
  const [ccv, setCcv] = useState(250);
  const [hours, setHours] = useState(3);
  const [rate, setRate] = useState(0.1);
  const [deliverable, setDeliverable] = useState<Deliverable>("mentions");
  const [vodPct, setVodPct] = useState(10);
  const [clips, setClips] = useState(1);
  const [clipFee, setClipFee] = useState(50);
  const [exclPct, setExclPct] = useState(0);
  const [streams, setStreams] = useState(1);

  const r = useMemo(() => {
    const d = DELIVERABLES.find((x) => x.id === deliverable) || DELIVERABLES[1];
    const viewerHours = Math.max(0, ccv) * Math.max(0, hours);
    const base = viewerHours * Math.max(0, rate) * d.mult;
    const vod = base * (Math.max(0, vodPct) / 100);
    const clipsTotal = Math.max(0, clips) * Math.max(0, clipFee);
    const subtotal = base + vod + clipsTotal;
    const excl = subtotal * (Math.max(0, exclPct) / 100);
    const perStream = subtotal + excl;
    const total = perStream * Math.max(1, streams);
    const perHour = hours > 0 ? perStream / hours : 0;
    const per1kVh = viewerHours > 0 ? (perStream / viewerHours) * 1000 : 0;
    return { d, viewerHours, base, vod, clipsTotal, excl, perStream, total, perHour, per1kVh };
  }, [ccv, hours, rate, deliverable, vodPct, clips, clipFee, exclPct, streams]);

  const input = "w-full border rounded-md px-3 py-2 text-gray-900";
  const label = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <section id="stream-calculator" className="my-8 border rounded-xl p-5 bg-slate-50">
      <h2 className="text-2xl font-bold mb-1">Sponsored Stream Rate Calculator</h2>
      <p className="text-sm text-gray-600 mb-4">
        Every default below is an illustrative starting value, not a market benchmark. Replace them with your own analytics and the rates you have actually been paid.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ccv" className={label}>Average concurrent viewers (CCV)</label>
          <input id="ccv" type="number" min={0} value={ccv} onChange={(e) => setCcv(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="hours" className={label}>Sponsored hours per stream</label>
          <input id="hours" type="number" min={0} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="rate" className={label}>Your rate per viewer-hour ($)</label>
          <input id="rate" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="deliverable" className={label}>Deliverable</label>
          <select id="deliverable" value={deliverable} onChange={(e) => setDeliverable(e.target.value as Deliverable)} className={input}>
            {DELIVERABLES.map((x) => (
              <option key={x.id} value={x.id}>{x.label} (x{x.mult})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vod" className={label}>VOD / replay kept public (+% of base)</label>
          <input id="vod" type="number" min={0} value={vodPct} onChange={(e) => setVodPct(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="exclusivity" className={label}>Category exclusivity (+% of subtotal)</label>
          <input id="exclusivity" type="number" min={0} value={exclPct} onChange={(e) => setExclPct(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="clips" className={label}>Clips or social posts included</label>
          <input id="clips" type="number" min={0} value={clips} onChange={(e) => setClips(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="clipfee" className={label}>Fee per clip / post ($)</label>
          <input id="clipfee" type="number" min={0} value={clipFee} onChange={(e) => setClipFee(Number(e.target.value))} className={input} />
        </div>
        <div>
          <label htmlFor="streams" className={label}>Number of sponsored streams in the deal</label>
          <input id="streams" type="number" min={1} value={streams} onChange={(e) => setStreams(Number(e.target.value))} className={input} />
        </div>
      </div>

      <div id="stream-result" className="mt-6 bg-white border rounded-lg p-4" aria-live="polite">
        <p className="text-lg font-bold text-gray-900">
          Suggested fee per stream: <span id="fee-per-stream">{money(r.perStream)}</span>
        </p>
        <p className="text-gray-800">Deal total ({Math.max(1, streams)} stream{streams > 1 ? "s" : ""}): <strong id="fee-total">{money(r.total)}</strong></p>
        <ul className="text-sm text-gray-700 mt-2 list-disc pl-5">
          <li>Viewer-hours per stream: {Math.round(r.viewerHours).toLocaleString("en-US")} ({ccv} CCV x {hours} h)</li>
          <li>Base fee: {money(r.base)} ({r.d.label}, x{r.d.mult})</li>
          <li>VOD add-on: {money(r.vod)} | Clips/posts: {money(r.clipsTotal)} | Exclusivity: {money(r.excl)}</li>
          <li>Effective price per sponsored hour: {money(r.perHour)}</li>
          <li>Effective cost per 1,000 viewer-hours (what a brand compares): {money(r.per1kVh)}</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">{r.d.note}</p>
      </div>
    </section>
  );
}
