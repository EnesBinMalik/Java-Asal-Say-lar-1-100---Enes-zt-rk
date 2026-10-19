import React from 'react';
import { X, CheckCircle, XCircle, Info, Calculator, Code } from 'lucide-react';
import { NumberInfo } from '../data/primeData';

interface NumberInspectorModalProps {
  numberInfo: NumberInfo | null;
  onClose: () => void;
}

export const NumberInspectorModal: React.FC<NumberInspectorModalProps> = ({ numberInfo, onClose }) => {
  if (!numberInfo) return null;

  const { val, isPrime, isOne, divisors, primeFactors, explanation } = numberInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black font-code shadow-md ${
                isPrime
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/20'
                  : isOne
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              {val}
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isPrime ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ASAL SAYIDIR
                  </span>
                ) : isOne ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Info className="w-3.5 h-3.5" />
                    ÖZEL DURUM (1 ASAL DEĞİLDİR)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-700/60 text-slate-300 border border-slate-600">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    BİLEŞİK SAYI (ASAL DEĞİL)
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {val} Sayısı Analizi
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explanation Card */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300 leading-relaxed">
          {explanation}
        </div>

        {/* Mathematical Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Divisors */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tüm Pozitif Bölenleri:</span>
            </div>
            <div className="font-code text-slate-200 font-semibold break-words">
              {divisors.join(', ')} ({divisors.length} adet)
            </div>
          </div>

          {/* Prime Factors */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Asal Çarpanları:</span>
            </div>
            <div className="font-code text-slate-200 font-semibold">
              {primeFactors.length > 0 ? primeFactors.join(' × ') : 'Yok (1 sayısı)'}
            </div>
          </div>
        </div>

        {/* Java Check Snippet for this number */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 font-code text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-amber-400">
              <Code className="w-3.5 h-3.5" />
              Java Algoritması Nasıl Değerlendirir?
            </span>
            <span>n = {val}</span>
          </div>

          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 overflow-x-auto leading-relaxed">
            {isOne ? (
              <div>
                <span className="text-slate-500">// Döngü i = 2'den başladığı için 1 direkt atlanır</span><br />
                <span className="text-amber-400">for</span> (int i = 2; i &lt;= 100; i++) &#123; ... &#125;
              </div>
            ) : isPrime ? (
              <div>
                <span className="text-slate-500">// {val} için 2'den {Math.floor(Math.sqrt(val))}'e kadar tam bölen arandı</span><br />
                <span className="text-emerald-400">// Hiçbir j için ({val} % j == 0) sağlanmadı!</span><br />
                <span className="text-cyan-400">System.out.print</span>({val} + <span className="text-emerald-300">" "</span>); <span className="text-emerald-400">// Ekrana yazdırıldı</span>
              </div>
            ) : (
              <div>
                <span className="text-slate-500">// {val} için ilk tam bölen {divisors[1]} bulundu</span><br />
                <span className="text-rose-400">if ({val} % {divisors[1]} == 0) &#123; asalMi = false; break; &#125;</span><br />
                <span className="text-slate-500">// Döngü kırıldı, ekrana YAZDIRILMADI</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
