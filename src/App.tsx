/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SignatureCard } from './components/SignatureCard';
import { CodeViewer } from './components/CodeViewer';
import { TerminalRunner } from './components/TerminalRunner';
import { PrimeGrid } from './components/PrimeGrid';
import { AlgorithmGuide } from './components/AlgorithmGuide';
import { PrimeCheckerTool } from './components/PrimeCheckerTool';
import { NumberInspectorModal } from './components/NumberInspectorModal';
import { NumberInfo } from './data/primeData';
import { AUTHOR_NAME, PRIMES_UNDER_100, SCENARIO_OUTPUT } from './data/javaCodes';
import { Code2, Terminal, Sparkles, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'grid' | 'guide'>('code');
  const [inspectNumber, setInspectNumber] = useState<NumberInfo | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Prominent Author & Signature Card */}
        <SignatureCard />

        {/* Tab Quick Switcher / Indicator Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('code')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Code2 className={`w-5 h-5 ${activeTab === 'code' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded">
                Kaynak Kod
              </span>
            </div>
            <div className="font-bold text-sm text-slate-100">Java Kaynak Kodu</div>
            <div className="text-xs text-slate-400 truncate">Klasik, optimize ve modern çözümler</div>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Terminal className={`w-5 h-5 ${activeTab === 'terminal' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                JVM Konsol
              </span>
            </div>
            <div className="font-bold text-sm text-slate-100">Terminal &amp; Çalıştır</div>
            <div className="text-xs text-slate-400 truncate">Canlı javac &amp; java simülasyonu</div>
          </button>

          <button
            onClick={() => setActiveTab('grid')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'grid'
                ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Sparkles className={`w-5 h-5 ${activeTab === 'grid' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                10x10 Matris
              </span>
            </div>
            <div className="font-bold text-sm text-slate-100">1-100 Matrisi</div>
            <div className="text-xs text-slate-400 truncate">Eratosthenes eleği &amp; bölenler</div>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-purple-500/10 border-purple-500/40 shadow-lg shadow-purple-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Award className={`w-5 h-5 ${activeTab === 'guide' ? 'text-purple-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400/80 bg-purple-500/10 px-1.5 py-0.5 rounded">
                Rehber
              </span>
            </div>
            <div className="font-bold text-sm text-slate-100">Algoritma Rehberi</div>
            <div className="text-xs text-slate-400 truncate">Satır satır analiz &amp; teorem</div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'code' && (
            <CodeViewer onRunInTerminal={() => setActiveTab('terminal')} />
          )}

          {activeTab === 'terminal' && (
            <TerminalRunner />
          )}

          {activeTab === 'grid' && (
            <PrimeGrid onSelectNumber={(num) => setInspectNumber(num)} />
          )}

          {activeTab === 'guide' && (
            <AlgorithmGuide />
          )}

          {/* Interactive Single Number Tester Available Across All Views */}
          <PrimeCheckerTool />
        </div>
      </main>

      {/* Modal for Number Inspection */}
      <NumberInspectorModal
        numberInfo={inspectNumber}
        onClose={() => setInspectNumber(null)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>1 - 100 Asal Sayı Programı &bull; <strong>{AUTHOR_NAME}</strong> İmzalı Çözüm</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-mono font-medium">Toplam: {PRIMES_UNDER_100.length} Asal Sayı</span>
            <span>&bull;</span>
            <span className="text-amber-400 font-medium">Senaryo: 2 3 5 7 ... 97</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
