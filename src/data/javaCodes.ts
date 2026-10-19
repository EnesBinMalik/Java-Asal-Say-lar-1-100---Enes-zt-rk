export interface JavaCodeVariant {
  id: string;
  title: string;
  badge: string;
  description: string;
  complexity: string;
  code: string;
}

export const JAVA_CODE_VARIANTS: JavaCodeVariant[] = [
  {
    id: 'classic',
    title: 'Klasik & Anlaşılır Yöntem (Temel Algoritma)',
    badge: 'Önerilen & Standart',
    description: 'En çok tercih edilen, döngüler ve boolean kontrol bayrağı (flag) mantığıyla çalışan temel Java çözümü.',
    complexity: 'Zaman Karmaşıklığı: O(N²)',
    code: `/**
 * 1 - 100 Arasındaki Asal Sayıları Ekrana Yazdıran Java Programı
 * 
 * @author Enes Öztürk
 * @version 1.0
 */
public class AsalSayilar {

    public static void main(String[] args) {
        // 1 ile 100 arasındaki sayılar kontrol edilir (1 asal değildir, 2'den başlanır)
        for (int i = 2; i <= 100; i++) {
            boolean asalMi = true;

            // Kendisinden küçük sayılara tam bölünüp bölünmediği kontrol edilir
            for (int j = 2; j < i; j++) {
                if (i % j == 0) {
                    asalMi = false; // Tam bölen bulundu, asal olamaz
                    break;          // Diğer bölenleri aramaya gerek yok
                }
            }

            // Eğer asalMi bayrağı bozulmadıysa sayı asaldır, ekrana yazdırılır
            if (asalMi) {
                System.out.print(i + " ");
            }
        }

        // İmza satırı
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("Hazırlayan / İmza: Enes Öztürk");
    }
}`
  },
  {
    id: 'optimized',
    title: 'Optimize Edilmiş Yöntem (Karekök Kontrolü - O(√N))',
    badge: 'Yüksek Performans',
    description: 'Bölenleri sayının kareköküne kadar arayarak işlem sayısını dramatik biçimde azaltan profesyonel yaklaşım.',
    complexity: 'Zaman Karmaşıklığı: O(N√N)',
    code: `/**
 * 1 - 100 Arasındaki Asal Sayılar (Optimize Edilmiş Karekök Çözümü)
 * 
 * @author Enes Öztürk
 */
public class AsalSayilarOptimize {

    public static void main(String[] args) {
        for (int sayi = 2; sayi <= 100; sayi++) {
            if (isAsal(sayi)) {
                System.out.print(sayi + " ");
            }
        }
        
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("İmza: Enes Öztürk");
    }

    /**
     * Bir sayının asal olup olmadığını karekök kuralı ile kontrol eder.
     * Bir bileşik sayının en az bir asal böleni <= √sayi olmak zorundadır.
     */
    public static boolean isAsal(int n) {
        if (n <= 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false; // Çift sayıları doğrudan ele

        // Sadece tek sayıları sayının kareköküne kadar test et
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
}`
  },
  {
    id: 'sieve',
    title: 'Eratosthenes Kalburu (Sieve of Eratosthenes)',
    badge: 'Matematiksel Algoritma',
    description: 'Antik Yunan matematikçisi Eratosthenes tarafından geliştirilen, asalların katlarını eleyen en hızlı algoritma.',
    complexity: 'Zaman Karmaşıklığı: O(N log(log N))',
    code: `import java.util.Arrays;

/**
 * 1 - 100 Arasındaki Asal Sayılar - Eratosthenes Kalburu Yaklaşımı
 * 
 * @author Enes Öztürk
 */
public class AsalSayilarKalbur {

    public static void main(String[] args) {
        int limit = 100;
        boolean[] asalMi = new boolean[limit + 1];
        
        // Başlangıçta tüm sayıları asal kabul et (true)
        Arrays.fill(asalMi, true);
        asalMi[0] = false; // 0 asal değil
        asalMi[1] = false; // 1 asal değil

        // 2'den başlayarak asal sayıların katlarını ele (false yap)
        for (int p = 2; p * p <= limit; p++) {
            if (asalMi[p]) {
                for (int kat = p * p; kat <= limit; kat += p) {
                    asalMi[kat] = false;
                }
            }
        }

        // Kalan asal sayıları ekrana yazdır
        for (int i = 2; i <= limit; i++) {
            if (asalMi[i]) {
                System.out.print(i + " ");
            }
        }

        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("İmza: Enes Öztürk");
    }
}`
  },
  {
    id: 'stream',
    title: 'Modern Java Stream API (Java 8+)',
    badge: 'Modern Fonksiyonel',
    description: 'Java Stream API ve IntStream kullanarak tek satırda filtreleme yapan modern fonksiyonel sözdizimi.',
    complexity: 'Fonksiyonel & Deklaratif',
    code: `import java.util.stream.IntStream;

/**
 * Modern Java 8+ Stream API ile 1-100 Asal Sayılar
 * 
 * @author Enes Öztürk
 */
public class AsalSayilarStream {

    public static void main(String[] args) {
        IntStream.rangeClosed(2, 100)
                 .filter(AsalSayilarStream::isAsal)
                 .forEach(n -> System.out.print(n + " "));

        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("İmza: Enes Öztürk");
    }

    public static boolean isAsal(int n) {
        return n > 1 && IntStream.rangeClosed(2, (int) Math.sqrt(n))
                                 .noneMatch(d -> n % d == 0);
    }
}`
  }
];

export const SCENARIO_OUTPUT = "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 ";
export const PRIMES_UNDER_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
export const AUTHOR_NAME = "Enes Öztürk";
