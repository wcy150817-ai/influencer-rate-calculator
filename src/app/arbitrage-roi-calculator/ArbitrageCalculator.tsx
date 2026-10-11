'use client';

import React, { useMemo, useState } from 'react';

type Mode = 'epc' | 'cr';

type RawInputs = {
  cpc: string;
  ctr: string;
  epc: string;
  cr: string;
  aov: string;
  payout: string;
  refund: string;
  fee: string;
  target: string;
};

type Result = {
  offerEpc: number;
  netFactor: number;
  grossRpc: number;
  netRpc: number;
  breakEvenCpc: number;
  profitPer1k: number;
  roi: number | null;
  maxCpcForTarget: number;
  requiredEpc: number | null;
  requiredCr: number | null;
};

const DEFAULTS: RawInputs = {
  cpc: '0.12',
  ctr: '35',
  epc: '0.45',
  cr: '3',
  aov: '80',
  payout: '25',
  refund: '8',
  fee: '3',
  target: '50',
};

const num = (s: string): number => {
  if (s.trim() === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
};

/** Pure model: every output is derived from revenue per ad click vs. cost per ad click. */
export function computeArbitrage(
  mode: Mode,
  v: { cpc: number; ctr: number; epc: number; cr: number; aov: number; payout: number; refund: number; fee: number; target: number },
): Result {
  const offerEpc = mode === 'epc' ? v.epc : (v.cr / 100) * v.aov * (v.payout / 100);
  const netFactor = (1 - v.refund / 100) * (1 - v.fee / 100);
  const grossRpc = (v.ctr / 100) * offerEpc;
  const netRpc = grossRpc * netFactor;
  const roi = v.cpc > 0 ? ((netRpc - v.cpc) / v.cpc) * 100 : null;
  const reachDenominator = (v.ctr / 100) * netFactor;
  const requiredCost = v.cpc * (1 + v.target / 100);
  const requiredEpc = reachDenominator > 0 ? requiredCost / reachDenominator : null;
  const crDenominator = reachDenominator * v.aov * (v.payout / 100);
  const requiredCr = mode === 'cr' && crDenominator > 0 ? (requiredCost / crDenominator) * 100 : null;
  return {
    offerEpc,
    netFactor,
    grossRpc,
    netRpc,
    breakEvenCpc: netRpc,
    profitPer1k: 1000 * (netRpc - v.cpc),
    roi,
    maxCpcForTarget: netRpc / (1 + v.target / 100),
    requiredEpc,
    requiredCr,
  };
}

const usd = (n: number, digits = 2) =>
  (n < 0 ? '-' : '') +
  '$' +
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const pct = (n: number, digits = 1) => `${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;

function Field(props: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-semibold text-gray-800">
        {props.label}
      </label>
      <div className="mt-1 flex items-center rounded-lg border border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
        {props.prefix ? <span className="pl-3 text-gray-500">{props.prefix}</span> : null}
        <input
          id={props.id}
          type="number"
          inputMode="decimal"
          step="any"
          min="0"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2 text-gray-900 outline-none"
        />
        {props.suffix ? <span className="pr-3 text-gray-500">{props.suffix}</span> : null}
      </div>
      <p className="mt-1 text-xs text-gray-500">{props.hint}</p>
    </div>
  );
}

export default function ArbitrageCalculator() {
  const [mode, setMode] = useState<Mode>('cr');
  const [raw, setRaw] = useState<RawInputs>(DEFAULTS);
  const set = (k: keyof RawInputs) => (v: string) => setRaw((r) => ({ ...r, [k]: v }));

  const { errors, values } = useMemo(() => {
    const v = {
      cpc: num(raw.cpc),
      ctr: num(raw.ctr),
      epc: num(raw.epc),
      cr: num(raw.cr),
      aov: num(raw.aov),
      payout: num(raw.payout),
      refund: num(raw.refund),
      fee: num(raw.fee),
      target: num(raw.target),
    };
    const e: string[] = [];
    if (Number.isNaN(v.cpc) || v.cpc < 0) e.push('Cost per click must be a number of 0 or more.');
    if (Number.isNaN(v.ctr) || v.ctr <= 0 || v.ctr > 100)
      e.push('Landing-page CTR must be above 0% and at most 100%. At 0% nobody reaches the offer, so revenue per click is zero.');
    if (mode === 'epc') {
      if (Number.isNaN(v.epc) || v.epc < 0) e.push('Offer EPC must be a number of 0 or more.');
    } else {
      if (Number.isNaN(v.cr) || v.cr < 0 || v.cr > 100) e.push('Offer conversion rate must be between 0% and 100%.');
      if (Number.isNaN(v.aov) || v.aov < 0) e.push('Average order value must be 0 or more.');
      if (Number.isNaN(v.payout) || v.payout < 0 || v.payout > 100) e.push('Payout share must be between 0% and 100%.');
    }
    if (Number.isNaN(v.refund) || v.refund < 0 || v.refund > 100) e.push('Refund/chargeback rate must be between 0% and 100%.');
    if (Number.isNaN(v.fee) || v.fee < 0 || v.fee > 100) e.push('Platform fee must be between 0% and 100%.');
    if (Number.isNaN(v.target) || v.target < -100) e.push('Target ROI must be a number of -100% or more.');
    return { errors: e, values: v };
  }, [raw, mode]);

  const result = useMemo(() => (errors.length ? null : computeArbitrage(mode, values)), [errors, mode, values]);

  const cpcRows = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const revRows = [0.6, 0.8, 1, 1.2, 1.4];

  const statusPill = (profit: number) =>
    profit > 0 ? (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Profit</span>
    ) : profit === 0 ? (
      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-800">Break-even</span>
    ) : (
      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-800">Loss</span>
    );

  return (
    <div id="calculator" className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Break-Even CPC Calculator</h2>
        <div role="group" aria-label="Revenue input mode" className="inline-flex overflow-hidden rounded-lg border border-gray-300 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setMode('cr')}
            aria-pressed={mode === 'cr'}
            className={`px-4 py-2 ${mode === 'cr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Conversion rate x AOV x payout
          </button>
          <button
            type="button"
            onClick={() => setMode('epc')}
            aria-pressed={mode === 'epc'}
            className={`px-4 py-2 ${mode === 'epc' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Offer EPC
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        The default numbers are an illustrative example, not a benchmark. Replace every field with your own tracked data.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field id="cpc" label="Cost per click (CPC)" prefix="$" hint="What the ad network charges you per click." value={raw.cpc} onChange={set('cpc')} />
        <Field id="ctr" label="Landing-page CTR" suffix="%" hint="Share of ad clicks that continue from your pre-sell page to the offer." value={raw.ctr} onChange={set('ctr')} />
        {mode === 'epc' ? (
          <Field id="epc" label="Offer EPC" prefix="$" hint="Earnings per click sent to the offer (your network or tracker reports this)." value={raw.epc} onChange={set('epc')} />
        ) : (
          <>
            <Field id="cr" label="Offer conversion rate" suffix="%" hint="Share of visitors who reach the offer and buy." value={raw.cr} onChange={set('cr')} />
            <Field id="aov" label="Average order value (AOV)" prefix="$" hint="Average cart value on the merchant side." value={raw.aov} onChange={set('aov')} />
            <Field id="payout" label="Payout share" suffix="%" hint="Commission percent of AOV (or your gross margin percent if you sell the product yourself)." value={raw.payout} onChange={set('payout')} />
          </>
        )}
        <Field id="refund" label="Refund / chargeback rate" suffix="%" hint="Share of revenue clawed back." value={raw.refund} onChange={set('refund')} />
        <Field id="fee" label="Platform fee" suffix="%" hint="Network cut, payment processing, tracker or agency fees as a percent of net revenue." value={raw.fee} onChange={set('fee')} />
        <Field id="target" label="Target ROI" suffix="%" hint="The return you need to scale. 50 means 50 cents of profit per dollar of ad spend." value={raw.target} onChange={set('target')} />
      </div>

      {errors.length > 0 ? (
        <div role="alert" className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
          <p className="font-semibold">Fix these inputs to see results:</p>
          <ul className="mt-2 list-disc pl-5">
            {errors.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {result ? (
        <div className="mt-8 space-y-8" aria-live="polite">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="text-xs font-semibold uppercase text-indigo-700">Break-even CPC</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{usd(result.breakEvenCpc, 4)}</div>
              <div className="text-xs text-gray-600">Pay more than this per click and you lose money.</div>
            </div>
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="text-xs font-semibold uppercase text-indigo-700">Profit per 1,000 clicks</div>
              <div className={`mt-1 text-2xl font-bold ${result.profitPer1k >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{usd(result.profitPer1k)}</div>
              <div className="text-xs text-gray-600">Net revenue minus ad spend.</div>
            </div>
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="text-xs font-semibold uppercase text-indigo-700">ROI</div>
              <div className={`mt-1 text-2xl font-bold ${result.roi !== null && result.roi < 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                {result.roi === null ? 'Undefined' : pct(result.roi)}
              </div>
              <div className="text-xs text-gray-600">
                {result.roi === null ? 'ROI needs a CPC above 0 (division by zero).' : 'Profit divided by ad spend.'}
              </div>
            </div>
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="text-xs font-semibold uppercase text-indigo-700">Max CPC for target ROI</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{usd(result.maxCpcForTarget, 4)}</div>
              <div className="text-xs text-gray-600">Highest bid that still hits your {Number.isNaN(values.target) ? '' : pct(values.target, 0)} target.</div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-800">
            <h3 className="text-base font-bold text-gray-900">Required performance for your target ROI</h3>
            {mode === 'cr' ? (
              <p className="mt-2">
                {result.requiredCr === null
                  ? 'Not reachable: with these AOV, payout, refund and fee values the revenue per conversion is zero, so no conversion rate can hit the target.'
                  : `You need an offer conversion rate of ${pct(result.requiredCr, 2)} (you entered ${pct(values.cr, 2)}) to reach ${pct(values.target, 0)} ROI at this CPC.`}
              </p>
            ) : (
              <p className="mt-2">
                {result.requiredEpc === null
                  ? 'Not reachable: landing-page CTR or the refund and fee settings leave no revenue per click.'
                  : `You need an offer EPC of ${usd(result.requiredEpc, 3)} (you entered ${usd(values.epc, 3)}) to reach ${pct(values.target, 0)} ROI at this CPC. Switch to the conversion-rate mode to translate this into a required conversion rate.`}
              </p>
            )}
            <p className="mt-2 text-gray-600">
              Offer EPC used: {usd(result.offerEpc, 3)} | revenue per ad click before refunds and fees: {usd(result.grossRpc, 4)} | after refunds and fees: {usd(result.netRpc, 4)}
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900">Scenario table 1: what if your CPC changes?</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-2">CPC change</th>
                    <th className="px-3 py-2">CPC</th>
                    <th className="px-3 py-2">Profit per 1,000 clicks</th>
                    <th className="px-3 py-2">ROI</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {cpcRows.map((m) => {
                    const cpc = values.cpc * m;
                    const profit = 1000 * (result.netRpc - cpc);
                    const roi = cpc > 0 ? ((result.netRpc - cpc) / cpc) * 100 : null;
                    return (
                      <tr key={m} className={`border-t border-gray-100 ${m === 1 ? 'bg-indigo-50 font-semibold' : ''}`}>
                        <td className="px-3 py-2">{m === 1 ? 'Your input' : `${m > 1 ? '+' : ''}${Math.round((m - 1) * 100)}%`}</td>
                        <td className="px-3 py-2">{usd(cpc, 4)}</td>
                        <td className="px-3 py-2">{usd(profit)}</td>
                        <td className="px-3 py-2">{roi === null ? 'Undefined' : pct(roi)}</td>
                        <td className="px-3 py-2">{statusPill(profit)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900">Scenario table 2: what if your revenue per click is off?</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-2">Revenue vs. estimate</th>
                    <th className="px-3 py-2">Net revenue per click</th>
                    <th className="px-3 py-2">Profit per 1,000 clicks</th>
                    <th className="px-3 py-2">ROI</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {revRows.map((m) => {
                    const rpc = result.netRpc * m;
                    const profit = 1000 * (rpc - values.cpc);
                    const roi = values.cpc > 0 ? ((rpc - values.cpc) / values.cpc) * 100 : null;
                    return (
                      <tr key={m} className={`border-t border-gray-100 ${m === 1 ? 'bg-indigo-50 font-semibold' : ''}`}>
                        <td className="px-3 py-2">{m === 1 ? 'Your input' : `${Math.round(m * 100)}%`}</td>
                        <td className="px-3 py-2">{usd(rpc, 4)}</td>
                        <td className="px-3 py-2">{usd(profit)}</td>
                        <td className="px-3 py-2">{roi === null ? 'Undefined' : pct(roi)}</td>
                        <td className="px-3 py-2">{statusPill(profit)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setRaw(DEFAULTS);
              setMode('cr');
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Reset to the illustrative example
          </button>
        </div>
      ) : null}
    </div>
  );
}
