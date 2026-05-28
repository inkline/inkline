import * as ts from "typescript";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { createDiagnosticCollector } from "../core/diagnostics/collector.ts";
import { resolveOptions, type InklineConfig } from "../core/options.ts";
import { SymbolTable } from "../ir/reactivity.ts";
import type { IRComponent, IRModule } from "../ir/render/nodes.ts";
import type { Code } from "../codegen/code-ir/nodes.ts";
import type { ComponentImport, GeneratedFile, Target, TargetName } from "../codegen/context.ts";
import { cRaw } from "../codegen/code-ir/builders.ts";
import { print } from "../codegen/print/printer.ts";
import { PluginRunner } from "../plugin/runner.ts";
import type { PluginContext } from "../plugin/types.ts";
import { analyzePass, type AnalyzedModule } from "./passes/04-analyze/index.ts";
import { programPass, type CompileInput } from "./passes/01-program.ts";
import { parsePass } from "./passes/02-parse/index.ts";
import { lower } from "./passes/03-lower/index.ts";
import { resolveSiblings } from "./passes/01-program/resolver.ts";
import type { PassContext } from "./types.ts";

export type { CompileInput } from "./passes/01-program.ts";
export type { AnalyzedModule } from "./passes/04-analyze/index.ts";

export interface CompileResult {
  readonly module?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}

function extractExternalImports(module: IRModule): readonly Code[] {
  return module.imports
    .filter((decl) => {
      const spec = (decl.moduleSpecifier as import("typescript").StringLiteral).text;
      return spec !== "@inkline/core" && !/\.ink(\.[jt]sx?)?$/.test(spec);
    })
    .map((decl) => cRaw({ text: decl.getText(module.sourceFile) }));
}

function extractComponentImports(module: IRModule): readonly ComponentImport[] {
  return module.imports
    .filter((decl) => {
      const spec = (decl.moduleSpecifier as import("typescript").StringLiteral).text;
      return /\.ink(\.[jt]sx?)?$/.test(spec);
    })
    .flatMap((decl) => {
      const spec = (decl.moduleSpecifier as import("typescript").StringLiteral).text;
      const relativePath = spec.replace(/\.ink(\.[jt]sx?)?$/, "");
      const componentName = relativePath.split("/").pop()!;
      const clause = decl.importClause;
      const imports: ComponentImport[] = [];

      const namedTypeImports: string[] = [];
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const el of clause.namedBindings.elements) {
          if (!el.isTypeOnly) continue;
          const imported = el.propertyName ? el.propertyName.text : el.name.text;
          const local = el.name.text;
          namedTypeImports.push(
            imported === local ? `type ${local}` : `type ${imported} as ${local}`,
          );
        }
      }

      if (clause?.name) {
        imports.push({
          localName: clause.name.text,
          componentName,
          relativePath,
          namedTypeImports: namedTypeImports.length > 0 ? namedTypeImports : undefined,
        });
      } else if (namedTypeImports.length > 0) {
        imports.push({
          localName: "",
          componentName,
          relativePath,
          namedTypeImports,
        });
      }

      return imports;
    });
}

function extractTypeDeclarations(module: IRModule): readonly Code[] {
  return module.sourceFile.statements
    .filter((s) => ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s))
    .map((s) => cRaw({ text: s.getText(module.sourceFile) }));
}

function emitComponent(
  component: IRComponent,
  target: Target,
  ctx: PassContext,
  module: IRModule,
  externalImports: readonly Code[],
  componentImports: readonly ComponentImport[],
  typeDeclarations: readonly Code[],
): GeneratedFile[] {
  const codeModule = target.emit(component, {
    diagnostics: ctx.diagnostics,
    options: ctx.options,
    symbols: ctx.symbols,
    rewrites: target.rewrites,
    contexts: module.contexts,
    externalImports,
    componentImports,
    typeDeclarations,
  });
  const result = print(codeModule.root, { sourceMap: ctx.options.sourceMap });
  const files: GeneratedFile[] = [
    {
      path: codeModule.fileName,
      contents: result.code,
      sourceMap: result.map,
    },
  ];

  for (const style of component.styles) {
    const needsCompanionCss =
      target.name === "react" ||
      target.name === "solid" ||
      target.name === "qwik" ||
      target.name === "angular";
    if (needsCompanionCss) {
      files.push({
        path: `${component.name}.css`,
        contents: style.css,
      });
    }
  }

  return files;
}

export async function compile(
  input: CompileInput,
  config?: Partial<InklineConfig>,
): Promise<CompileResult> {
  const options = resolveOptions(config);
  const diagnostics = createDiagnosticCollector();
  const symbols = new SymbolTable();

  const ctx: PassContext = {
    diagnostics,
    options,
    symbols,
    registry: options.registry,
  };

  // Validate: registry supports all requested targets
  for (const targetName of options.targets) {
    if (!options.registry.has(targetName)) {
      throw new Error(
        `Registry does not support target "${targetName}". ` +
          `Available: ${options.registry.list().join(", ") || "(none)"}`,
      );
    }
  }

  // Validate: warn on unknown target option keys
  for (const [targetName, userOpts] of Object.entries(options.targetOptions)) {
    if (!userOpts) continue;
    const target = options.registry.get(targetName as TargetName);
    if (!target?.defaultOptions) continue;
    const knownKeys = Object.keys(target.defaultOptions);
    for (const key of Object.keys(userOpts)) {
      if (!knownKeys.includes(key)) {
        diagnostics.push(
          "INK0080",
          { file: "", line: 0, column: 0, offset: 0, length: 0 },
          {
            key: `${targetName}.${key}`,
          },
        );
      }
    }
  }

  // P1: create TS program
  const artifact = await programPass.run(input, ctx);

  // P2: parse .ink.tsx → IRModule
  const rawModule = await parsePass.run(artifact, ctx);

  // P2.5: resolve sibling files (.ink.css, .ink.scss) and merge styles
  const siblings = resolveSiblings(input.fileName);
  const moduleWithSiblings: IRModule =
    siblings.styles.length > 0
      ? {
          ...rawModule,
          components: rawModule.components.map((c) => ({
            ...c,
            styles: [...c.styles, ...siblings.styles],
          })),
        }
      : rawModule;

  // P3: lower (normalize control flow, slots, bindings, static marks)
  const module = lower(moduleWithSiblings, ctx);

  // P4: analyze (reactivity graph + validation + cycle detection)
  const analyzedModule = await analyzePass.run(module, ctx);

  // Plugin runner
  const runner = new PluginRunner(options.plugins);
  const pluginCtx: PluginContext = {
    pushDiagnostic: (d) => diagnostics.pushFrom([d]),
    options,
  };

  // ir:post hook (after P4)
  await runner.invokeIrPost(analyzedModule, pluginCtx);

  // P5 emit + P6 print per target, with H3 error recovery
  const files: Partial<Record<TargetName, GeneratedFile[]>> = {};
  const externalImports = extractExternalImports(analyzedModule.module);
  const componentImports = extractComponentImports(analyzedModule.module);
  const typeDeclarations = extractTypeDeclarations(analyzedModule.module);

  for (const targetName of options.targets) {
    const target = options.registry.get(targetName);
    if (!target) continue;

    const targetFiles: GeneratedFile[] = [];

    for (const component of analyzedModule.module.components) {
      try {
        targetFiles.push(
          ...emitComponent(
            component,
            target,
            ctx,
            analyzedModule.module,
            externalImports,
            componentImports,
            typeDeclarations,
          ),
        );
      } catch (err) {
        diagnostics.push("INK0100", component.loc, {
          name: component.name,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // code:post hook (after P6 per target)
    const finalFiles = await runner.invokeCodePost(targetName, targetFiles, pluginCtx);
    files[targetName] = [...finalFiles];
  }

  return {
    module: analyzedModule,
    files,
    diagnostics: diagnostics.freeze(),
  };
}
