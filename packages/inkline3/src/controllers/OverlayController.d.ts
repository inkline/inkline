import { Component } from 'vue';

declare const OverlayController: {
    instances: { [key: string]: Component };
    stack: string[];
    zIndex: number;
    register(instance: Component);
    unregister(instance: Component);
    open(id: string);
    close(id: string);
    getTopOverlay(): Component;
    onPressEscape();
};

export { OverlayController };

export default OverlayController;
