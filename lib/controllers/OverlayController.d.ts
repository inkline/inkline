export declare const OverlayController: {
    instances: {
        [key: string]: any;
    };
    stack: string[];
    zIndex: number;
    register(instance: any): void;
    unregister(instance: any): void;
    open(id: string): void;
    close(id: string): void;
    getTopOverlay(): any;
    onPressEscape(): void;
};
export default OverlayController;
