/**
 * Optimal string alignment distance between two strings — Levenshtein plus transposition, so
 * `"raect"` is one edit from `"react"` rather than two. Transposition counts as one edit because
 * it is one mistake: swapped adjacent characters are the typo a keyboard produces, and at the
 * thresholds {@link suggestClosest} uses, charging two for it is the difference between suggesting
 * `"react"` and suggesting nothing.
 *
 * Candidate lists here are tiny (seven targets, a handful of option keys), so the three-row dynamic
 * program is fast enough and stays readable.
 */
export function editDistance(a: string, b: string): number {
  // `prevPrev` is the row two above, which is where a transposition reads its cost from.
  let prevPrev: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(
        prev[j]! + 1,
        curr[j - 1]! + 1,
        prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        curr[j] = Math.min(curr[j]!, prevPrev[j - 2]! + 1);
      }
    }
    prevPrev = prev;
    prev = curr;
  }

  return prev[b.length]!;
}

/**
 * The candidate closest to `input`, or `undefined` when nothing is close enough to be worth
 * suggesting. The threshold scales with input length (one edit for short words, more for long ones)
 * so `"reakt"` and `"raect"` both suggest `"react"` while `"nuxt"` suggests nothing at all.
 *
 * This is the repository's only "did you mean" implementation, on purpose: it answers for target
 * names arriving by `--target`, by `targets` in a config file, and as `targetOutDir`/`targetOptions`
 * keys, as well as for ARIA attributes and config keys. A second copy drifts, and the symptom is a
 * suggestion on one input path and silence on another for the same typo.
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
