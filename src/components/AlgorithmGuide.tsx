import React from 'react';
import { BookOpen, HelpCircle, CheckCircle, Lightbulb, Code, Award, ShieldCheck, Cpu } from 'lucide-react';
import { AUTHOR_NAME, PRIMES_UNDER_100 } from '../data/javaCodes';

export const AlgorithmGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Java Asal Sayılar Algoritması &amp; Konu Anlatımı
          </h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Bu dokümanda, 1 ile 100 arasındaki asal sayıları ekrana yazdıran Java programının arkasındaki matematiksel mantık, döngü yapısı, optimizasyon yöntemleri ve <strong>{AUTHOR_NAME}</strong> imzalı çözümün detayları açıklanmıştır.
        </p>
      </div>

      {/* Grid of 2 key mathematical insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Why 1 is not prime */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <HelpCircle className="w-4 h-4" />
            <span>Neden 1 Asal Sayı Değildir?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Asal sayılar tanım gereği <strong>1'den büyük</strong> ve yalnızca <strong>tam olarak 2 farklı pozitif böleni</strong> (1 ve kendisi) olan doğal sayılardır. 1 sayısının ise yalnızca <strong>1 adet</strong> pozitif böleni vardır.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
            💡 <strong>Matematiksel Sebep:</strong> Aritmetiğin Temel Teoremi'ne göre her bileşik sayı yalnızca bir tek şekilde asal çarpanlarına ayrılabilir. 1 asal kabul edilseydi bu teklik kuralı bozulurdu.
          </div>
        </div>

        {/* Why 2 is unique */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <CheckCircle className="w-4 h-4" />
            <span>2 Sayısının Benzersiz Rolü</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>2</strong>, en küçük asal sayıdır ve aynı zamanda <strong>çift olan tek asal sayıdır</strong>. 2'den büyük tüm çift sayılar (4, 6, 8, ...) en azından 2'ye bölünebildikleri için asal olamazlar.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
            🚀 <strong>Optimizasyon Avantajı:</strong> Java kodumuzda çift sayıları tek bir <code className="text-amber-300">n % 2 == 0</code> kontrolüyle eleyerek döngü işlem süresini yarı yarıya indirebiliriz.
          </div>
        </div>
      </div>

      {/* Step by step code breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Java Kodunun Satır Satır Çalışma Mantığı
          </h3>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm font-code">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                1'den 100'e Dış Döngü (<code className="text-amber-300 font-code">for (int i = 2; i &lt;= 100; i++)</code>)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                1 sayısı asal olmadığı için döngüyü <code className="text-amber-300 font-code">i = 2</code>'den başlatıyoruz ve 100'e kadar ilerletiyoruz.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm font-code">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                Asallık Bayrağı Belirleme (<code className="text-emerald-300 font-code">boolean asalMi = true;</code>)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Her sayıyı test etmeden önce başlangıçta asal kabul ediyoruz (<code className="text-emerald-300 font-code">true</code>). Eğer kendisinden küçük herhangi bir sayıya tam bölünürse bu bayrağı <code className="text-rose-400 font-code">false</code> yapacağız.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm font-code">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                Bölen Kontrolü ve Mod Operatörü (<code className="text-cyan-300 font-code">if (i % j == 0)</code>)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                İç döngüde <code className="text-cyan-300 font-code">j</code> değerleri 2'den <code className="text-cyan-300 font-code">i</code>'ye kadar gider. <code className="text-cyan-300 font-code">%</code> (kalan) operatörü ile tam bölünüp bölünmediği denetlenir. Eğer tam bölünüyorsa sayı asal değildir, <code className="text-rose-400 font-code">asalMi = false;</code> yapılır ve <code className="text-amber-300 font-code">break;</code> ile iç döngüden hemen çıkılır (boşuna sonraki bölenlere bakılmaz).
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm font-code">
              4
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                Ekrana Yazdırma (<code className="text-purple-300 font-code">System.out.print(i + " ")</code>)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                İç döngü bittiğinde <code className="text-emerald-300 font-code">asalMi</code> hala <code className="text-emerald-300 font-code">true</code> ise sayı asaldır. <code className="text-purple-300 font-code">System.out.println</code> yerine <code className="text-purple-300 font-code">System.out.print</code> kullanılarak sayılar yan yana birer boşluk bırakılarak yazdırılır. Bu sayede senaryodaki çıktı birebir elde edilir.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 font-bold flex items-center justify-center shrink-0 text-sm font-code">
              5
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                Geliştirici İmzası (<code className="text-orange-300 font-code">{AUTHOR_NAME}</code>)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Programın sonunda <code className="text-orange-300 font-code">System.out.println("Hazırlayan / İmza: Enes Öztürk");</code> satırı eklenerek programın {AUTHOR_NAME} tarafından hazırlandığı açıkça belirtilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Complexity Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Yöntemlerin Karmaşıklık &amp; Performans Karşılaştırması
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Yöntem Adı</th>
                <th className="py-2.5 px-3">Zaman Karmaşıklığı</th>
                <th className="py-2.5 px-3">1-100 İşlem Sayısı</th>
                <th className="py-2.5 px-3">Kullanım Amacı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-code">
              <tr className="text-slate-300">
                <td className="py-3 px-3 font-semibold text-amber-300">Klasik İçiçe Döngü</td>
                <td className="py-3 px-3 text-slate-400">O(N²)</td>
                <td className="py-3 px-3 text-slate-300">~1.100 kontrol</td>
                <td className="py-3 px-3 font-sans text-slate-400">Okul ödevleri, temel algoritmik mantık</td>
              </tr>
              <tr className="text-slate-300">
                <td className="py-3 px-3 font-semibold text-emerald-300">Karekök Optimizasyonu</td>
                <td className="py-3 px-3 text-emerald-400">O(N√N)</td>
                <td className="py-3 px-3 text-emerald-300">~240 kontrol</td>
                <td className="py-3 px-3 font-sans text-slate-400">Mülakatlar, orta ölçekli veri setleri</td>
              </tr>
              <tr className="text-slate-300">
                <td className="py-3 px-3 font-semibold text-cyan-300">Eratosthenes Kalburu</td>
                <td className="py-3 px-3 text-cyan-400">O(N log log N)</td>
                <td className="py-3 px-3 text-cyan-300">~170 işlem</td>
                <td className="py-3 px-3 font-sans text-slate-400">Büyük aralıklar (1.000.000+ sayılar)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
