/**
 * Levenshtein edit distance between two strings. Candidate lists here are tiny (seven targets,
 * a handful of option keys), so the plain two-row dynamic program is fast enough and stays readable.
 */
export function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(
        prev[j]! + 1,
        curr[j - 1]! + 1,
        prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = curr;
  }

  return prev[b.length]!;
}

/**
 * The candidate closest to `input`, or `undefined` when nothing is close enough to be worth
 * suggesting. The threshold scales with input length (one edit for short words, more for long ones)
 * so `"reakt"` suggests `"react"` while `"nuxt"` suggests nothing at all.
 */
export function suggestClosest(input: string, candidates: readonly string[]): string | undefined {
  const needle = input.toLowerCase();
  let best: string | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const distance = editDistance(needle, candidate.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }

  const threshold = Math.max(1, Math.floor(needle.length / 3));
  return bestDistance <= threshold ? best : undefined;
}
