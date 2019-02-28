import {IInput} from "./Input";

export declare class IInputNumber extends IInput{
   min: number;
   max: number;
   precision: number;
   step: number;

   decrease(): void;
   increase(): void;
   formatPrecision(value: string): void;
   onBlurFormatPrecision(event: Event): void;
}