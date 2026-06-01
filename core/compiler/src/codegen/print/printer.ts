import type { SourceMapMode } from "../../core/options.ts";
import { SourceMapBuilder } from "../../core/sourcemap.ts";
import { assertNever } from "../../core/assert.ts";
import { UNKNOWN_LOCATION } from "../../ir/types.ts";
import type {
  CFile,
  CGroup,
  CImport,
  CIndent,
  CJsxAttr,
  CJsxElement,
  CScript,
  CStmt,
  CStyle,
  CTmplAttr,
  CTmplDirective,
  CTmplElement,
  CTmplMustache,
  Code,
} from "../code-ir/nodes.ts";

export interface PrintOptions {
  readonly indent: number;
  readonly newline: "\n" | "\r\n";
  readonly sourceMap: SourceMapMode;
  readonly file?: string;
}

export interface PrintResult {
  readonly code: string;
  readonly map?: string;
}

class Printer {
  private readonly chunks: string[] = [];
  private readonly sm?: SourceMapBuilder;
  private flavor: CFile["flavor"] = "tsx";
  private depth = 0;
  private line = 0;
  private col = 0;
  private atLineStart = true;

  constructor(private readonly opts: PrintOptions) {
    if (opts.sourceMap !== "none") {
      this.sm = new SourceMapBuilder();
    }
  }

  private write(text: string): void {
    if (text.length === 0) return;
    if (this.atLineStart) {
      const indent = " ".repeat(this.depth * this.opts.indent);
      this.chunks.push(indent);
      this.col += indent.length;
      this.atLineStart = false;
    }
    this.chunks.push(text);
    this.col += text.length;
  }

  private writeLine(): void {
    this.chunks.push(this.opts.newline);
    this.line++;
    this.col = 0;
    this.atLineStart = true;
  }

  private writeRaw(text: string): void {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) this.writeLine();
      const line = lines[i]!;
      if (line.length > 0) this.write(line);
    }
  }

  private ensureNewline(): void {
    if (!this.atLineStart) this.writeLine();
  }

  private map(node: { span?: { file: string; line: number; column: number } }): void {
    if (!this.sm || !node.span || node.span.file === UNKNOWN_LOCATION.file) return;
    const genCol = this.atLineStart ? this.depth * this.opts.indent : this.col;
    this.sm.add(this.line, genCol, node.span.file, node.span.line - 1, node.span.column - 1);
  }

  emit(node: Code): void {
    if (node.hints?.includes("preserve-newline-before")) {
      this.ensureNewline();
      this.writeLine();
    }

    this.map(node);

    switch (node.kind) {
      case "CFile":
        this.emitFile(node);
        break;
      case "CScript":
        this.emitScript(node);
        break;
      case "CImport":
        this.emitImport(node);
        break;
      case "CStmt":
        this.emitStmt(node);
        break;
      case "CExpr":
        this.write(node.text);
        break;
      case "CRaw":
        this.writeRaw(node.text);
        break;
      case "CJsxElement":
        this.emitJsx(node);
        break;
      case "CJsxAttr":
        this.emitJsxAttr(node);
        break;
      case "CJsxText":
        this.write(node.text);
        break;
      case "CTmplElement":
        this.emitTmpl(node);
        break;
      case "CTmplDirective":
        this.emitTmplDirective(node);
        break;
      case "CTmplAttr":
        this.emitTmplAttr(node);
        break;
      case "CTmplText":
        this.write(node.text);
        break;
      case "CTmplMustache":
        this.emitMustache(node);
        break;
      case "CGroup":
        this.emitGroup(node);
        break;
      case "CIndent":
        this.emitIndent(node);
        break;
      case "CStyle":
        this.emitStyle(node);
        break;
      default:
        assertNever(node);
    }

    if (node.hints?.includes("preserve-newline-after")) this.ensureNewline();
  }

  private emitFile(node: CFile): void {
    this.flavor = node.flavor;
    for (const child of node.children) {
      this.emit(child);
      this.ensureNewline();
    }
  }

  private emitScript(node: CScript): void {
    this.write(`<script${node.setup ? " setup" : ""} lang="${node.lang}">`);
    this.writeLine();
    this.depth++;
    for (const child of node.children) {
      this.emit(child);
      this.ensureNewline();
    }
    this.depth--;
    this.write("</script>");
    this.writeLine();
  }

  private emitImport(node: CImport): void {
    this.write("import ");
    if (node.typeOnly) this.write("type ");

    const parts: string[] = [];
    if (node.defaultLocal) parts.push(node.defaultLocal);
    if (node.named && node.named.length > 0) {
      const specs = node.named.map((n) =>
        n.local && n.local !== n.imported ? `${n.imported} as ${n.local}` : n.imported,
      );
      parts.push(`{ ${specs.join(", ")} }`);
    }

    this.write(parts.join(", "));
    this.write(` from "${node.module}";`);
    this.writeLine();
  }

  private emitStmt(node: CStmt): void {
    if (typeof node.body === "string") {
      this.write(node.body);
    } else {
      this.emit(node.body);
      this.write(";");
    }
    this.writeLine();
  }

  private emitJsx(node: CJsxElement): void {
    this.write(`<${node.tag}`);
    for (const attr of node.attrs) {
      this.write(" ");
      this.emit(attr);
    }
    if (node.selfClose) {
      this.write(" />");
      this.writeLine();
      return;
    }
    this.write(">");
    if (node.children.length > 0) {
      this.writeLine();
      this.depth++;
      for (const child of node.children) {
        this.emit(child);
        this.ensureNewline();
      }
      this.depth--;
      this.write(`</${node.tag}>`);
    } else {
      this.write(`</${node.tag}>`);
    }
    this.writeLine();
  }

  private emitJsxAttr(node: CJsxAttr): void {
    this.write(node.name);
    switch (node.value.kind) {
      case "static":
        this.write(`="${node.value.text}"`);
        break;
      case "expr":
        this.write("={");
        this.emit(node.value.expr);
        this.write("}");
        break;
      case "boolean":
        break;
    }
  }

  private emitTmpl(node: CTmplElement): void {
    this.write(`<${node.tag}`);
    for (const dir of node.directives) {
      this.write(" ");
      this.emit(dir);
    }
    for (const attr of node.attrs) {
      this.write(" ");
      this.emit(attr);
    }
    if (node.selfClose) {
      this.write(" />");
      this.writeLine();
      return;
    }
    this.write(">");
    if (node.children.length > 0) {
      this.writeLine();
      this.depth++;
      for (const child of node.children) {
        this.emit(child);
        this.ensureNewline();
      }
      this.depth--;
      this.write(`</${node.tag}>`);
    } else {
      this.write(`</${node.tag}>`);
    }
    this.writeLine();
  }

  private emitTmplDirective(node: CTmplDirective): void {
    this.write(node.directive);
    if (node.arg) this.write(`:${node.arg}`);
    if (node.modifier) {
      for (const m of node.modifier) this.write(`.${m}`);
    }
    if (node.expr) {
      if (this.flavor === "sfc-svelte") {
        this.write(`={${node.expr.text}}`);
      } else {
        const text = node.expr.text;
        const quote = text.includes('"') ? "'" : '"';
        this.write(`=${quote}${text}${quote}`);
      }
    }
  }

  private emitTmplAttr(node: CTmplAttr): void {
    // A spread carries no attribute name — e.g. Svelte `{...rest}`.
    if (node.value.kind === "spread") {
      this.write(`{...${node.value.expr.text}}`);
      return;
    }
    this.write(node.name);
    if (node.value.kind === "static") {
      this.write(`="${node.value.text}"`);
    } else if (this.flavor === "sfc-svelte") {
      this.write(`={${node.value.expr.text}}`);
    } else {
      const text = node.value.expr.text;
      const quote = text.includes('"') ? "'" : '"';
      this.write(`=${quote}${text}${quote}`);
    }
  }

  private emitMustache(node: CTmplMustache): void {
    if (this.flavor === "sfc-svelte") {
      this.write(`{${node.expr.text}}`);
    } else {
      this.write(`{{ ${node.expr.text} }}`);
    }
  }

  private emitGroup(node: CGroup): void {
    for (const child of node.children) {
      this.emit(child);
    }
  }

  private emitIndent(node: CIndent): void {
    this.depth++;
    for (const child of node.children) {
      this.emit(child);
    }
    this.depth--;
  }

  private emitStyle(node: CStyle): void {
    const tag = node.scoped ? "<style scoped>" : "<style>";
    this.ensureNewline();
    this.write(tag);
    this.writeLine();
    for (const line of node.css.split("\n")) {
      this.write(`  ${line}`);
      this.writeLine();
    }
    this.write("</style>");
    this.writeLine();
  }

  result(file?: string): PrintResult {
    const code = this.chunks.join("");
    if (this.opts.sourceMap === "none" || !this.sm) {
      return { code };
    }
    const mapJson = this.sm.toJSON(file);
    if (this.opts.sourceMap === "inline") {
      const b64 = Buffer.from(mapJson).toString("base64");
      return {
        code: `${code}${this.opts.newline}//# sourceMappingURL=data:application/json;base64,${b64}${this.opts.newline}`,
      };
    }
    return { code, map: mapJson };
  }
}

export function print(root: Code, opts?: Partial<PrintOptions>): PrintResult {
  const resolved: PrintOptions = {
    indent: opts?.indent ?? 2,
    newline: opts?.newline ?? "\n",
    sourceMap: opts?.sourceMap ?? "none",
    file: opts?.file,
  };
  const printer = new Printer(resolved);
  printer.emit(root);
  return printer.result(resolved.file);
}
