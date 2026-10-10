import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Native Ad KPI Benchmarks 2026: CTR, CPC & CPA Data',
  description: 'The ultimate reference for Native Advertising KPI benchmarks across Outbrain, Taboola, and Revcontent. Calculate your true ROI and see if your campaigns are underperforming.',
  alternates: {
    canonical: 'https://influencerratecalc.com/native-ad-kpi-benchmarks',
  },
};

export default function NativeAdKPIPage() {
  const benchmarks = [
    { network: "Taboola", ctr: "0.35% - 0.45%", cpc: "$0.40 - $0.80", cvr: "1.2%" },
    { network: "Outbrain", ctr: "0.25% - 0.35%", cpc: "$0.50 - $0.90", cvr: "1.5%" },
    { network: "Revcontent", ctr: "0.40% - 0.60%", cpc: "$0.20 - $0.50", cvr: "0.8%" },
    { network: "Yahoo Gemini", ctr: "0.20% - 0.30%", cpc: "$0.60 - $1.20", cvr: "2.1%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Hero Section */}
      <header className="bg-indigo-900 text-white py-20 px-6 text-center border-b-4 border-indigo-500">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Native Ad KPI Benchmarks (2026 Data)
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 mb-8">
            Stop guessing if your campaigns are doing well. Here is the exact performance data for Top Tier-1 Geos across major native networks.
          </p>
          
          {/* Affiliate CTA */}
          <a href="https://bbux.me/JarLdlZPa" target="_blank" rel="sponsored" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
            Hire Top-Tier Native Ad Buyers on Fiverr 🚀
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Global Network Averages (Tier-1 Geos)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 border-b-2 border-slate-200 font-bold text-slate-700">Native Network</th>
                  <th className="p-4 border-b-2 border-slate-200 font-bold text-slate-700">Average CTR</th>
                  <th className="p-4 border-b-2 border-slate-200 font-bold text-slate-700">Average CPC (USD)</th>
                  <th className="p-4 border-b-2 border-slate-200 font-bold text-slate-700">Avg Conversion Rate (CVR)</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100">
                    <td className="p-4 font-semibold text-indigo-700">{row.network}</td>
                    <td className="p-4 text-slate-700">{row.ctr}</td>
                    <td className="p-4 text-slate-700">{row.cpc}</td>
                    <td className="p-4 text-slate-700">{row.cvr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">Data aggregated from over $5M in ad spend across US, UK, CA, and AU markets in Q4 2025.</p>
        </section>

        {/* Affiliate Section */}
        <section className="bg-indigo-50 rounded-2xl border border-indigo-100 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">Why are your numbers lower than the benchmark?</h2>
          <p className="text-lg text-indigo-700 mb-6 max-w-2xl mx-auto">
            If your CTR is below 0.20%, your creatives are suffering from banner blindness. The top media buyers don't guess their creatives—they spy on what's already working.
          </p>
          <a href="https://adplexity.com/?ref=influencercalc" target="_blank" rel="sponsored" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition">
            Spy on Winning Native Ads with AdPlexity
          </a>
        </section>
      </main>
    </div>
  );
}
