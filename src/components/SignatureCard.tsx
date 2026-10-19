import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { AUTHOR_NAME } from '../data/javaCodes';

export const SignatureCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const javadocSignature = `/**
 * Proje: 1 - 100 Arası Asal Sayıları Ekrana Yazdıran Java Programı
 * Geliştirici: ${AUTHOR_NAME}
 * Tarih: ${new Date().toLocaleDateString('tr-TR')}
 * Durum: Tamamlandı & Doğrulandı (Senaryo 2-97)
 */`;

  const copySignature = () => {
    navigator.clipboard.writeText(javadocSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-amber-500/30 p-4 sm:p-6 shadow-xl shadow-amber-500/5">
      {/* Decorative background glow */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md shadow-orange-500/30">
              EÖ
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-slate-950 shadow">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Doğrulanmış İmzalı Kod
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1 - 100 Asallar
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {AUTHOR_NAME}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Java Programlama Çözümü &bull; Senaryo Çıktısı (2'den 97'ye 25 Asal Sayı)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={copySignature}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all"
            title="Javadoc İmza Bloğunu Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">İmza Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>İmza Bloğunu Kopyala</span>
              </>
            )}
          </button>
          
          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>İmza koda ve konsol çıktısına entegredir</span>
          </div>
        </div>
      </div>
    </div>
  );
};
