export interface ModelProviderMixin {
    value: string;

    currentValue (): string;
    model (): string;
}