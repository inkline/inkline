export interface ClassesProviderMixin {
    classes (): Array<{ [key: string]: boolean }>
}