import { Component } from 'vue';

declare const offsetModifier: (offset: number) => any;
declare const arrowModifier: () => any;
declare const preventOverflowModifier: () => any;
declare const computeStylesModifier: () => any;
declare const sameWidthModifier: () => any;
declare const useBaseModifiers: (options: { offset: number }, extend?: any[]) => any[];

declare const PopupMixin: Component;

export {
    offsetModifier,
    arrowModifier,
    preventOverflowModifier,
    computeStylesModifier,
    sameWidthModifier,
    useBaseModifiers
};
export default PopupMixin;
