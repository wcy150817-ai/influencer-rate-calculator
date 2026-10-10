import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '2026 Native Ad KPI Benchmarks: Taboola vs Outbrain Live CPC Data',
  description: 'Compare live CPC, CTR, and CPA benchmarks for Taboola and Outbrain across Tier 1 and Tier 2 geos for E-com and SaaS.',
};

export default function NativeAdBenchmarksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: '2026 Native Ad KPI Benchmarks: Taboola vs Outbrain Live CPC Data',
        description: 'Detailed analysis of native advertising KPIs for Taboola and Outbrain in 2026.',
        author: {
          '@type': 'Organization',
          name: 'Influencer Rate Calculator'
        }
      },
      {
        '@type': 'Dataset',
        name: '2026 Taboola and Outbrain KPI Benchmarks',
        description: 'CPC, CTR, and CPA data for native ads across different verticals and tiers.',
        creator: {
          '@type': 'Organization',
          name: 'Influencer Rate Calculator'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            2026 Native Ad KPI Benchmarks
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Taboola vs Outbrain Live CPC, CTR & CPA Data
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* E-commerce Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">E-commerce Benchmarks</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Tier 1 (US, UK, CA, AU)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">CPC</p>
                    <p className="text-xl font-bold text-gray-900">$0.45 - $0.85</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">CTR</p>
                    <p className="text-xl font-bold text-gray-900">0.25% - 0.40%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">CPA</p>
                    <p className="text-xl font-bold text-gray-900">$35 - $65</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Tier 2 (LATAM, SEA)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">CPC</p>
                    <p className="text-xl font-bold text-gray-900">$0.10 - $0.25</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">CTR</p>
                    <p className="text-xl font-bold text-gray-900">0.30% - 0.55%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">CPA</p>
                    <p className="text-xl font-bold text-gray-900">$12 - $25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SaaS Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">SaaS / B2B Benchmarks</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Tier 1 (US, UK, CA, AU)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">CPC</p>
                    <p className="text-xl font-bold text-gray-900">$1.20 - $2.50</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">CTR</p>
                    <p className="text-xl font-bold text-gray-900">0.15% - 0.28%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">CPA</p>
                    <p className="text-xl font-bold text-gray-900">$85 - $150</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Tier 2 (LATAM, SEA)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">CPC</p>
                    <p className="text-xl font-bold text-gray-900">$0.35 - $0.70</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">CTR</p>
                    <p className="text-xl font-bold text-gray-900">0.20% - 0.35%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">CPA</p>
                    <p className="text-xl font-bold text-gray-900">$30 - $60</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Calculate Your Campaign ROI</h2>
          <p className="text-lg mb-8 text-indigo-100 max-w-2xl mx-auto">
            Stop guessing your native ad performance. Use our advanced calculator to project your exact costs and returns before you launch on Taboola or Outbrain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/"
              className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-md w-full sm:w-auto"
            >
              Go to Main Calculator
            </Link>
            <Link 
              href="#affiliate-offer"
              className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-400 transition-colors shadow-md w-full sm:w-auto border border-indigo-400"
            >
              Get $100 Ad Credit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
