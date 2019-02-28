export interface ClearablePropertyMixin {
    clearable: boolean;

    isClearable(): boolean;
    clear(): void;
}