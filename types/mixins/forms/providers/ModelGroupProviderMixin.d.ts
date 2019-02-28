export interface ModelGroupProviderMixin {
    value: Array<string | boolean> | boolean | string;

    currentValue (): Array<string | boolean> | boolean | string;
    model (): Array<string | boolean> | boolean | string;
}