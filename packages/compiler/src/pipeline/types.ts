import type { DiagnosticCollector } from "../core/diagnostics/collector.ts";
import type { ResolvedCompilerOptions } from "../core/options.ts";
import type { SymbolTable } from "../ir/reactivity.ts";
import type { TargetRegistry } from "../codegen/context.ts";

export interface Pass<I, O> {
  readonly name: string;
  run(input: I, ctx: PassContext): O | Promise<O>;
}

export interface PassContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly registry: Readonly<TargetRegistry>;
}

export function pipe<A, B>(p1: Pass<A, B>): Pass<A, B>;
export function pipe<A, B, C>(p1: Pass<A, B>, p2: Pass<B, C>): Pass<A, C>;
export function pipe<A, B, C, D>(p1: Pass<A, B>, p2: Pass<B, C>, p3: Pass<C, D>): Pass<A, D>;
export function pipe<A, B, C, D, E>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
): Pass<A, E>;
export function pipe<A, B, C, D, E, F>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
): Pass<A, F>;
export function pipe<A, B, C, D, E, F, G>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
  p6: Pass<F, G>,
): Pass<A, G>;
export function pipe<A, B, C, D, E, F, G, H>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
  p6: Pass<F, G>,
  p7: Pass<G, H>,
): Pass<A, H>;
export function pipe<A, B, C, D, E, F, G, H, J>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
  p6: Pass<F, G>,
  p7: Pass<G, H>,
  p8: Pass<H, J>,
): Pass<A, J>;
export function pipe<A, B, C, D, E, F, G, H, J, K>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
  p6: Pass<F, G>,
  p7: Pass<G, H>,
  p8: Pass<H, J>,
  p9: Pass<J, K>,
): Pass<A, K>;
export function pipe<A, B, C, D, E, F, G, H, J, K, L>(
  p1: Pass<A, B>,
  p2: Pass<B, C>,
  p3: Pass<C, D>,
  p4: Pass<D, E>,
  p5: Pass<E, F>,
  p6: Pass<F, G>,
  p7: Pass<G, H>,
  p8: Pass<H, J>,
  p9: Pass<J, K>,
  p10: Pass<K, L>,
): Pass<A, L>;
export function pipe(...passes: Pass<unknown, unknown>[]): Pass<unknown, unknown> {
  return {
    name: passes.map((p) => p.name).join(" → "),
    async run(input: unknown, ctx: PassContext) {
      let result = input;
      for (const pass of passes) {
        result = await pass.run(result, ctx);
      }
      return result;
    },
  };
}
