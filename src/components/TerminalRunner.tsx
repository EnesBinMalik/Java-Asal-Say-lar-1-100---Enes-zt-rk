import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, FastForward, CheckCircle2, Terminal as TerminalIcon, Sparkles, Copy, Check } from 'lucide-react';
import { PRIMES_UNDER_100, SCENARIO_OUTPUT, AUTHOR_NAME } from '../data/javaCodes';

export const TerminalRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentPrimeIndex, setCurrentPrimeIndex] = useState<number>(0);
  const [printedPrimes, setPrintedPrimes] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100); // ms per prime
  const [stepCurrentCheck, setStepCurrentCheck] = useState<number>(2);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);

  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new items are printed
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [printedPrimes, isCompleted]);

  // Handle running simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentPrimeIndex < PRIMES_UNDER_100.length) {
      timer = setTimeout(() => {
        const nextPrime = PRIMES_UNDER_100[currentPrimeIndex];
        setPrintedPrimes(prev => [...prev, nextPrime]);
        setStepCurrentCheck(nextPrime);
        setCurrentPrimeIndex(prev => prev + 1);
      }, speed);
    } else if (isRunning && currentPrimeIndex >= PRIMES_UNDER_100.length) {
      setIsRunning(false);
      setIsCompleted(true);
      setStepCurrentCheck(100);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentPrimeIndex, speed]);

  const handleStart = () => {
    setPrintedPrimes([]);
    setCurrentPrimeIndex(0);
    setIsCompleted(false);
    setIsRunning(true);
  };

  const handleRunInstant = () => {
    setIsRunning(false);
    setPrintedPrimes([...PRIMES_UNDER_100]);
    setCurrentPrimeIndex(PRIMES_UNDER_100.length);
    setIsCompleted(true);
    setStepCurrentCheck(100);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPrintedPrimes([]);
    setCurrentPrimeIndex(0);
    setIsCompleted(false);
    setStepCurrentCheck(2);
  };

  const handleCopyOutput = () => {
    const outputString = printedPrimes.join(' ') + ' ';
    navigator.clipboard.writeText(outputString);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  const currentPrintedText = printedPrimes.join(' ') + (printedPrimes.length > 0 ? ' ' : '');
  const isMatchScenario = currentPrintedText === SCENARIO_OUTPUT;

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2">
          {!isRunning && !isCompleted ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Programı Çalıştır (Run)</span>
            </button>
          ) : isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
              <span>Durdur (Pause)</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tekrar Çalıştır</span>
            </button>
          )}

          <button
            onClick={handleRunInstant}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            title="Tüm çıktıyı tek seferde üret"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>Anında Tamamla</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-all cursor-pointer"
            title="Konsolu Temizle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed settings */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Yazdırma Hızı:</span>
          <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setSpeed(200)}
              className={`px-2 py-1 rounded text-xs transition-all ${speed === 200 ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              1x (0.2s)
            </button>
            <button
              onClick={() => setSpeed(80)}
              className={`px-2 py-1 rounded text-xs transition-all ${speed === 80 ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              2x (0.08s)
            </button>
            <button
              onClick={() => setSpeed(30)}
              className={`px-2 py-1 rounded text-xs transition-all ${speed === 30 ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              5x (Hızlı)
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden font-code">
        {/* Terminal Title Bar */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/90" />
              <div className="w-3 h-3 rounded-full bg-amber-500/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
            </div>
            <span className="text-xs text-slate-400 ml-2 font-medium flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-slate-500" />
              OpenJDK JVM Console &mdash; AsalSayilar.java
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              İmza: {AUTHOR_NAME}
            </span>
            <button
              onClick={handleCopyOutput}
              disabled={printedPrimes.length === 0}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 disabled:opacity-40 px-2 py-1 bg-slate-800 rounded border border-slate-700 transition-all cursor-pointer"
            >
              {copiedOutput ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Çıktıyı Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="p-5 sm:p-6 text-xs sm:text-sm leading-relaxed space-y-3 min-h-[340px] max-h-[500px] overflow-y-auto"
        >
          {/* Bash commands */}
          <div className="space-y-1 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">enes@ozturk-dev</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400 font-semibold">~/workspace/asal-sayilar</span>
              <span className="text-slate-400">$</span>
              <span className="text-slate-100 font-semibold">javac AsalSayilar.java && java AsalSayilar</span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 my-2 pt-2 text-slate-500 text-xs">
            === 1 ile 100 Arasındaki Asal Sayılar Algoritması Başlatıldı ===
          </div>

          {/* The Actual Output (Scenario) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 shadow-inner">
            <div className="text-[11px] text-slate-500 mb-2 flex items-center justify-between">
              <span>Konsol Standart Çıktısı (System.out.print):</span>
              <span className="text-amber-400/90 font-medium">{printedPrimes.length} / 25 Sayı Bulundu</span>
            </div>

            {printedPrimes.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center">
                Program henüz çalıştırılmadı. Yukarıdaki "Programı Çalıştır" butonuna basarak Java kodunun 1-100 arasındaki asal sayıları nasıl ekrana yazdırdığını görebilirsiniz.
              </div>
            ) : (
              <div className="font-code text-sm sm:text-base text-emerald-400 font-medium tracking-wide break-words whitespace-pre-wrap leading-loose">
                {printedPrimes.map((prime, idx) => (
                  <span
                    key={idx}
                    className="inline-block transition-all duration-200 transform scale-100 hover:scale-125 hover:text-amber-300 hover:bg-slate-800 px-1 rounded cursor-pointer"
                    title={`Asal Sayı #${idx + 1}: ${prime}`}
                  >
                    {prime}{' '}
                  </span>
                ))}
                {isRunning && (
                  <span className="inline-block w-2.5 h-5 bg-amber-400 animate-pulse align-middle ml-1" />
                )}
              </div>
            )}
          </div>

          {/* Program completed signature and footer */}
          {isCompleted && (
            <div className="space-y-2 pt-2">
              <div className="text-slate-600 font-code">----------------------------------------</div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div className="text-amber-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Hazırlayan / İmza: {AUTHOR_NAME}</span>
                </div>
                <div className="text-slate-400">
                  Toplam Asal Sayı: <span className="text-emerald-400 font-bold">25 adet</span> (1 ile 100 arası)
                </div>
              </div>
              <div className="text-slate-600 font-code">----------------------------------------</div>
              <div className="text-emerald-500 text-xs font-semibold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>[Process finished with exit code 0 - Senaryo %100 Doğrulandı]</span>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Status bar */}
        <div className="bg-[#161b22] px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : isCompleted ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span>{isRunning ? 'Çalışıyor (Running)...' : isCompleted ? 'Tamamlandı (Success)' : 'Hazır (Idle)'}</span>
            </span>
            <span>&bull;</span>
            <span>Kontrol Edilen En Yüksek Sayı: <strong className="text-slate-200">{stepCurrentCheck}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span>Senaryo Durumu:</span>
            {isMatchScenario ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Senaryo Tam Eşleşti
              </span>
            ) : (
              <span className="text-slate-500">
                {printedPrimes.length === 0 ? 'Bekleniyor' : `${printedPrimes.length} / 25 Sayı`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
