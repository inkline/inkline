export type ExportsEntry = string | {
    require?: string;
    import?: string;
    types?: string;
};
export declare function generateExports(baseDir: string, options?: {
    ignore?: string[];
    exports?: Map<string, ExportsEntry>;
}): Promise<void>;
