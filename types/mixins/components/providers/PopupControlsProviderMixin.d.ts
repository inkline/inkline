export interface PopupControlsProviderMixin {
    trigger: string | string[];
    showTimeout: number;
    hideTimeout: number;
    value: boolean;

    show (): void;
    hide (): void;
    onClick (): void;
    initElements (): void;
    initAriaAttributes (): void;
    addEvents (): void;
    removeEvents (): void;
}