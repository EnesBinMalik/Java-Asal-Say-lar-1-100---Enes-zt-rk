export interface NumberInfo {
  val: number;
  isPrime: boolean;
  isOne: boolean;
  divisors: number[];
  primeFactors: number[];
  explanation: string;
}

export function getDivisors(n: number): number[] {
  const divs: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

export function getPrimeFactors(n: number): number[] {
  if (n <= 1) return [];
  const factors: number[] = [];
  let d = 2;
  let temp = n;
  while (temp >= 2) {
    if (temp % d === 0) {
      factors.push(d);
      temp /= d;
    } else {
      d++;
      if (d * d > temp && temp > 1) {
        factors.push(temp);
        break;
      }
    }
  }
  return factors;
}

export function generateNumbers1To100(): NumberInfo[] {
  const result: NumberInfo[] = [];

  for (let i = 1; i <= 100; i++) {
    if (i === 1) {
      result.push({
        val: 1,
        isPrime: false,
        isOne: true,
        divisors: [1],
        primeFactors: [],
        explanation: "1 sayısı asal DEĞİLDİR. Asal sayılar tanım gereği 1'den büyük ve tam olarak 2 farklı pozitif böleni olan (1 ve kendisi) doğal sayılardır."
      });
      continue;
    }

    const divisors = getDivisors(i);
    const isPrime = divisors.length === 2; // only 1 and itself
    const primeFactors = getPrimeFactors(i);

    let explanation = "";
    if (isPrime) {
      if (i === 2) {
        explanation = "2, en küçük asal sayıdır ve aynı zamanda TEK ÇİFT asal sayıdır. Yalnızca 1 ve 2'ye tam bölünür.";
      } else {
        explanation = `${i} asal bir sayıdır. Kendisi ve 1 haricinde hiçbir tam sayıya bölünmez. Pozitif bölenleri: [1, ${i}].`;
      }
    } else {
      const properDivisors = divisors.slice(1, -1);
      explanation = `${i} bir bileşik sayıdır (asal değildir). 1 ve kendisi dışında [${properDivisors.join(', ')}] gibi sayılara da tam bölünür.`;
    }

    result.push({
      val: i,
      isPrime,
      isOne: false,
      divisors,
      primeFactors,
      explanation
    });
  }

  return result;
}

export const ALL_NUMBERS_1_TO_100 = generateNumbers1To100();
