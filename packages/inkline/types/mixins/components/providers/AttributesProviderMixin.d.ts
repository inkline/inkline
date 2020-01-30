export interface AttributesProviderMixin {
    attributes (): { [key: string]: string }
}