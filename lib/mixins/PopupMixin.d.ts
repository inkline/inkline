import { Instance, Placement } from '@popperjs/core';
export declare const offsetModifier: (offset: number) => {
    name: string;
    options: {
        offset: number[];
    };
};
export declare const arrowModifier: () => {
    name: string;
    options: {
        padding: number;
    };
};
export declare const preventOverflowModifier: () => {
    name: string;
    options: {
        padding: number;
    };
};
export declare const computeStylesModifier: () => {
    name: string;
    options: {
        gpuAcceleration: boolean;
        adaptive: boolean;
    };
};
export declare const sameWidthModifier: () => {
    name: string;
    enabled: boolean;
    phase: string;
    requires: string[];
    fn: ({ state }: {
        state: any;
    }) => void;
    effect({ state }: {
        state: any;
    }): void;
};
export declare const useBaseModifiers: ({ offset }: {
    offset: number;
}) => ({
    name: string;
    options: {
        offset: number[];
    };
} | {
    name: string;
    options: {
        padding: number;
    };
} | {
    name: string;
    options: {
        gpuAcceleration: boolean;
        adaptive: boolean;
    };
})[];
declare const _default: import("vue").DefineComponent<{
    placement: {
        type: StringConstructor;
        default: Placement;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    popperOptions: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, {
    popperInstance?: Instance | undefined;
}, {}, {
    createPopper(): void;
    destroyPopper(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    placement?: unknown;
    offset?: unknown;
    popperOptions?: unknown;
} & {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
} & {}>, {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
}>;
/**
 * @param {HTMLElement} [popupElement=$refs.overlay]
 * The HTML element used as overlay, or a configuration used to generate the overlay.
 * @param {String} [placement=auto]
 * Placement of the overlay, accepted values:
 *	- auto(-start, -end)
 *	- top(-start, -end)
 *	- right(-start, -end)
 *	- bottom(-start, -end)
 *	- left(-start, -end)
 * @param {Boolean} [visible=false]
 * Visibility of the overlay
 * @param {Number} [offset=0]
 * Amount of pixels the overlay will be shifted (can be negative).
 */
export default _default;
