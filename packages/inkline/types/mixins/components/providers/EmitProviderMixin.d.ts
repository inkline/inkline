export interface EmitProviderMixin {
    dispatch (childComponentName: string, eventName: string, params: any): void;
    broadcast (parentComponentName: string, eventName: string, params: any): void;
}