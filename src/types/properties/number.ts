export interface NumberPropertyVariant {
    multiply?: string | number;
    divide?: string | number;
    add?: string | number;
    subtract?: string | number;

    [key: string]: NumberPropertyVariant | number | string | undefined;
}
