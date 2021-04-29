import { Component } from 'vue';

declare const OverlayController: {
    instances: { [key: string]: Component };
    stack: string[];
    zIndex: number;
    register(instance: Component): void;
    unregister(instance: Component): void;
    open(id: string): void;
    close(id: string): void;
    getTopOverlay(): Component;
    onPressEscape(): void;
};

export { OverlayController };

export default OverlayController;