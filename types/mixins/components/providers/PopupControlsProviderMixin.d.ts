export interface PopupControlsProviderMixin {
    trigger: string;
    showTimeout: number;
    hideTimeout: number;

    show (): void;
    hide (): void;
    onClick (): void;
    initElements (): void;
    initAriaAttributes (): void;
    addEvents (): void;
    removeEvents (): void;
}