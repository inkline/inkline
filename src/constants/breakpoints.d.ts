export interface IBreakpoints {
    [key: string]: number[]
}

declare const breakpoints: IBreakpoints;
declare const breakpointKeys: string[];

export { breakpoints, breakpointKeys };
