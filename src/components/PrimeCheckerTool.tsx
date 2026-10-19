import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { getDivisors, getPrimeFactors } from '../data/primeData';

export const PrimeCheckerTool: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('97');
  const [result, setResult] = useState<{
    num: number;
    isPrime: boolean;
    divisors: number[];
    primeFactors: number[];
  } | null>(() => {
    const num = 97;
    const divs = getDivisors(num);
    return {
      num,
      isPrime: divs.length === 2,
      divisors: divs,
      primeFactors: getPrimeFactors(num),
    };
  });

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(inputVal, 10);
    if (isNaN(parsed) || parsed < 1) return;

    const divs = getDivisors(parsed);
    const isPrime = parsed > 1 && divs.length === 2;
    setResult({
      num: parsed,
      isPrime,
      divisors: divs,
      primeFactors: getPrimeFactors(parsed),
    });
  };

  const sampleNumbers = [2, 17, 49, 91, 97, 100];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Canlı Asal Sayı Sorgulayıcı (Java Test Aracı)
          </h3>
        </div>
        <span className="text-xs text-slate-400">Herhangi bir sayıyı test edin</span>
      </div>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min="1"
            max="100000"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Örn: 97, 91, 47..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-code"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Sorgula</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick sample chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400">Hızlı Örnekler:</span>
        {sampleNumbers.map((s) => (
          <button
            key={s}
            onClick={() => {
              setInputVal(s.toString());
              const divs = getDivisors(s);
              setResult({
                num: s,
                isPrime: s > 1 && divs.length === 2,
                divisors: divs,
                primeFactors: getPrimeFactors(s),
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-code transition-all cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Result Display */}
      {result && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code text-xl font-black text-white">{result.num}</span>
              {result.isPrime ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ASAL SAYIDIR
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" />
                  ASAL DEĞİLDİR (BİLEŞİK SAYI)
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 font-code">
              Bölen Sayısı: <span className="text-slate-200 font-bold">{result.divisors.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">Pozitif Bölenleri:</span>
              <span className="font-code text-slate-200 font-semibold break-words">
                [{result.divisors.join(', ')}]
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">Asal Çarpanlara Ayrılışı:</span>
              <span className="font-code text-slate-200 font-semibold">
                {result.primeFactors.length > 0 ? result.primeFactors.join(' × ') : 'Yok (1 sayısı)'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
