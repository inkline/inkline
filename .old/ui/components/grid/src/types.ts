import { Breakpoint } from '@inkline/theme';

export const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

export type FlexDirectionProp = (typeof flexDirectionValues)[number];

export const flexJustifyContentValues = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly'
];

export type FlexJustifyContentProp = (typeof flexJustifyContentValues)[number];

export const flexAlignItemsValues = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];

export type FlexAlignItemsProp = (typeof flexAlignItemsValues)[number];

export type GridSizeProp = 'auto' | 'grow' | number | `${number}`;

export type BreakpointObject<T> = Partial<Record<Breakpoint, T>>;

export type BreakpointProp<T> = T | BreakpointObject<T>;
