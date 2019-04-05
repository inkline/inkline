export interface PopupProviderMixin {
    transformOrigin: boolean | string;
    placement: string;
    offset: number;
    arrow: boolean;
    arrowOffset: number;
    appendToBody: boolean;
    popperOptions: any;
    reference: any;
    popup: any;
    value: boolean;

    createPopper (): void;
    updatePopper (): void;
    doDestroy (): void;
    destroyPopper (): void;
    resetTransformOrigin (): void;
    beforeDestroy (): void;
    deactivated (): void;
}