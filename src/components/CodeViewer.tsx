import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle, Flame, Cpu, ArrowRight } from 'lucide-react';
import { JAVA_CODE_VARIANTS, SCENARIO_OUTPUT, AUTHOR_NAME } from '../data/javaCodes';

interface CodeViewerProps {
  onRunInTerminal: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onRunInTerminal }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('classic');
  const [copied, setCopied] = useState<boolean>(false);

  const activeVariant = JAVA_CODE_VARIANTS.find(v => v.id === selectedVariantId) || JAVA_CODE_VARIANTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeVariant.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'AsalSayilar.java';
    if (activeVariant.id === 'optimized') filename = 'AsalSayilarOptimize.java';
    if (activeVariant.id === 'sieve') filename = 'AsalSayilarKalbur.java';
    if (activeVariant.id === 'stream') filename = 'AsalSayilarStream.java';

    const blob = new Blob([activeVariant.code], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const codeLines = activeVariant.code.split('\n');

  return (
    <div className="space-y-6">
      {/* Top Banner / Scenario Requirements Match */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/25 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              İstenen Senaryo Çıktısı (Ekrana Yazılan)
            </span>
            <span className="text-xs text-slate-400">25 Asal Sayı</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-code text-xs sm:text-sm text-emerald-400 overflow-x-auto shadow-inner select-all">
            {SCENARIO_OUTPUT}
          </div>
          <p className="text-[11px] text-slate-400">
            * 1 sayısı asal sayı tanımı gereği dahil edilmemiştir. Döngü 2'den başlar ve 97'de sonlanır.
          </p>
        </div>

        <button
          onClick={onRunInTerminal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          <span>JVM Konsolunda Çalıştır</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Code Editor Frame */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Editor Tab Bar */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Method Selection Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {JAVA_CODE_VARIANTS.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileCode className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{variant.title.split(' ')[0]} {variant.title.split(' ')[1]}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-amber-400/20 text-amber-200' : 'bg-slate-800 text-slate-400'}`}>
                    {variant.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action buttons (Copy, Download) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
              title="Java Kodunu Kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 transition-all"
              title=".java Olarak İndir"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Selected Variant Summary */}
        <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">{activeVariant.title}</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">{activeVariant.description}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-amber-400/90 font-code">
              <Cpu className="w-3.5 h-3.5" />
              {activeVariant.complexity}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold">İmza: {AUTHOR_NAME}</span>
          </div>
        </div>

        {/* Code Content with Line Numbers & Highlights */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-slate-950/70 font-code text-xs sm:text-sm leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isSignatureLine = line.includes('Enes Öztürk') || line.includes('author') || line.includes('İmza:');
                const isPrintLine = line.includes('System.out.print');

                return (
                  <tr
                    key={lineNum}
                    className={`hover:bg-slate-850/50 transition-colors ${
                      isSignatureLine ? 'bg-amber-500/10' : isPrintLine ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <td className="pr-4 py-0.5 text-right text-slate-600 select-none w-10 text-xs">
                      {lineNum}
                    </td>
                    <td className="py-0.5 pl-2 text-slate-300 font-code whitespace-pre">
                      {renderSyntaxHighlightedLine(line)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Editor Footer */}
        <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Java SE 8 / 11 / 17 / 21 Uyumlu</span>
            </span>
            <span>&bull;</span>
            <span>UTF-8 Kodlama</span>
          </div>
          <div>
            <span className="text-amber-400 font-medium">Hazırlayan: {AUTHOR_NAME}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple syntax colorizer for Java tokens
function renderSyntaxHighlightedLine(line: string) {
  // Check comments
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Highlight author name specifically
  if (line.includes('Enes Öztürk')) {
    const parts = line.split('Enes Öztürk');
    return (
      <>
        <span>{parts[0]}</span>
        <span className="text-amber-300 font-bold bg-amber-500/20 px-1 rounded border border-amber-500/40">
          Enes Öztürk
        </span>
        <span>{parts[1]}</span>
      </>
    );
  }

  // Keywords highlighting
  const keywords = ['public', 'class', 'static', 'void', 'main', 'for', 'if', 'else', 'return', 'boolean', 'int', 'true', 'false', 'break', 'import', 'new'];
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

  const parts = line.split(regex);
  return (
    <span>
      {parts.map((part, i) => {
        if (keywords.includes(part)) {
          return <span key={i} className="text-amber-400 font-medium">{part}</span>;
        }
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} className="text-emerald-300">{part}</span>;
        }
        if (part.includes('System.out.')) {
          return <span key={i} className="text-cyan-300">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
