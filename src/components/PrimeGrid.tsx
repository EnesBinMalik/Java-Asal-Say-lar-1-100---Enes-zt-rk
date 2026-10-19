import React, { useState } from 'react';
import { ALL_NUMBERS_1_TO_100, NumberInfo } from '../data/primeData';
import { Sparkles, Filter, Info, Play, RotateCcw } from 'lucide-react';
import { PRIMES_UNDER_100, AUTHOR_NAME } from '../data/javaCodes';

interface PrimeGridProps {
  onSelectNumber: (info: NumberInfo) => void;
}

export const PrimeGrid: React.FC<PrimeGridProps> = ({ onSelectNumber }) => {
  const [filter, setFilter] = useState<'all' | 'primes' | 'composites' | 'one'>('all');
  const [sieveStep, setSieveStep] = useState<number | null>(null);

  // Filter logic
  const filteredNumbers = ALL_NUMBERS_1_TO_100.filter((item) => {
    if (filter === 'primes') return item.isPrime;
    if (filter === 'composites') return !item.isPrime && !item.isOne;
    if (filter === 'one') return item.isOne;
    return true;
  });

  // Sieve steps
  // Step 1: 1 eliminated
  // Step 2: 2 is prime, multiples of 2 crossed out
  // Step 3: 3 is prime, multiples of 3 crossed out
  // Step 4: 5 is prime, multiples of 5 crossed out
  // Step 5: 7 is prime, multiples of 7 crossed out
  // Step 6: All primes revealed!
  const isSieveActive = sieveStep !== null;

  const handleNextSieveStep = () => {
    if (sieveStep === null) setSieveStep(1);
    else if (sieveStep < 6) setSieveStep(sieveStep + 1);
    else setSieveStep(null);
  };

  const handleResetSieve = () => {
    setSieveStep(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sieve controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              1 - 100 Asal Sayı Matrisi & Elek Simülasyonu
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
              25 Asal Sayı
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Herhangi bir sayıya tıklayarak bölenlerini ve Java algoritma kontrolünü inceleyin.
          </p>
        </div>

        {/* Eratosthenes Sieve controller */}
        <div className="flex items-center gap-2">
          {sieveStep === null ? (
            <button
              onClick={() => setSieveStep(1)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Eratosthenes Eleğini Başlat</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-cyan-300 font-semibold px-2">
                Adım {sieveStep}/6: {getSieveStepName(sieveStep)}
              </span>
              <button
                onClick={handleNextSieveStep}
                className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
              >
                {sieveStep === 6 ? 'Bitir' : 'İleri »'}
              </button>
              <button
                onClick={handleResetSieve}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tümü (100)
          </button>
          <button
            onClick={() => setFilter('primes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'primes'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Asallar (25)
          </button>
          <button
            onClick={() => setFilter('composites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'composites'
                ? 'bg-slate-700/60 text-slate-200 border border-slate-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bileşik Sayılar (74)
          </button>
          <button
            onClick={() => setFilter('one')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'one'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1 Sayısı (1)
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-emerald-400 font-medium">Asal Sayı (25)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
            <span>Bileşik Sayı</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-900 border border-rose-500/40 text-rose-400" />
            <span>1 (Asal Değil)</span>
          </div>
        </div>
      </div>

      {/* 10x10 Matrix Grid */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
          {filteredNumbers.map((num) => {
            const isEliminatedInSieve = isSieveActive && getSieveEliminated(num.val, sieveStep);
            const isHighlightedPrimeInSieve = isSieveActive && getSieveIsCurrentPrime(num.val, sieveStep);

            return (
              <button
                key={num.val}
                onClick={() => onSelectNumber(num)}
                className={`relative group aspect-square flex flex-col items-center justify-center rounded-xl p-1 font-code text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                  num.isPrime
                    ? 'bg-gradient-to-br from-emerald-500/25 to-teal-500/10 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/30 hover:scale-105'
                    : num.isOne
                    ? 'bg-slate-900 text-rose-400/80 border border-rose-500/30 hover:border-rose-400 hover:bg-rose-500/10'
                    : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 hover:text-slate-200'
                } ${
                  isEliminatedInSieve ? 'opacity-25 scale-90 grayscale' : ''
                } ${
                  isHighlightedPrimeInSieve ? 'ring-2 ring-amber-400 scale-105 bg-amber-500/30 text-amber-200' : ''
                }`}
                title={`${num.val} - ${num.isPrime ? 'Asal Sayı' : num.isOne ? 'Asal Değil' : 'Bileşik Sayı'}`}
              >
                <span>{num.val}</span>
                {num.isPrime && (
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-sans font-semibold">
                    asal
                  </span>
                )}
                {num.isOne && (
                  <span className="text-[8px] text-rose-400 font-sans">
                    özel
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Matrix Footer Note */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>1 ile 100 arasında tam olarak <strong>25 adet</strong> asal sayı bulunmaktadır.</span>
          </div>
          <div className="text-amber-400/90 font-medium">
            İmza: {AUTHOR_NAME}
          </div>
        </div>
      </div>
    </div>
  );
};

function getSieveStepName(step: number): string {
  switch (step) {
    case 1:
      return "1 Sayısı Eleniyor (Asal değildir)";
    case 2:
      return "2 Asaldır -> 2'nin katları eleniyor (4, 6, 8, ...)";
    case 3:
      return "3 Asaldır -> 3'ün katları eleniyor (9, 15, 21, ...)";
    case 4:
      return "5 Asaldır -> 5'in katları eleniyor (25, 35, 55, ...)";
    case 5:
      return "7 Asaldır -> 7'nin katları eleniyor (49, 77, 91)";
    case 6:
      return "√100 = 10'a ulaşıldı! Kalan 25 sayı asal olarak tescillendi.";
    default:
      return "";
  }
}

function getSieveIsCurrentPrime(val: number, step: number): boolean {
  if (step === 2 && val === 2) return true;
  if (step === 3 && val === 3) return true;
  if (step === 4 && val === 5) return true;
  if (step === 5 && val === 7) return true;
  if (step === 6 && PRIMES_UNDER_100.includes(val)) return true;
  return false;
}

function getSieveEliminated(val: number, step: number): boolean {
  if (step >= 1 && val === 1) return true;
  if (step >= 2 && val > 2 && val % 2 === 0) return true;
  if (step >= 3 && val > 3 && val % 3 === 0) return true;
  if (step >= 4 && val > 5 && val % 5 === 0) return true;
  if (step >= 5 && val > 7 && val % 7 === 0) return true;
  return false;
}
