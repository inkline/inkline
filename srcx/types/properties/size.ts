import { NumberPropertyVariant } from './number';

export type SizeMultiplierProperty = string | number;

export type SizeMultiplierPropertyVariant = NumberPropertyVariant | SizeMultiplierProperty;

export type ResolvedSizeMultiplierProperty = SizeMultiplierProperty;

export type SizePercentagesProperty = Record<string, string>;

export type ResolvedSizePercentagesProperty = SizePercentagesProperty;
