import { isKey } from '@inkline/inkline/helpers';

export const OverlayController = {
    instances: {} as { [key: string]: any },
    stack: [] as string[],
    zIndex: 1000,
    register(instance: any) {
        if (instance && instance.id) {
            OverlayController.instances[instance.id] = instance;
        }
    },
    unregister(instance: any) {
        if (instance && instance.id) {
            OverlayController.instances[instance.id] = null;

            delete OverlayController.instances[instance.id];
        }
    },
    open(id: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.push(id);
        OverlayController.instances[id].$el.style.zIndex = OverlayController.zIndex++;
    },
    close(id: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.splice(OverlayController.stack.indexOf(id), 1);
    },
    getTopOverlay(): any {
        const topOverlay = OverlayController.stack.slice(-1)[0] || {};

        return OverlayController.instances[(topOverlay as any).id];
    },
    onPressEscape() {
        const topOverlay = OverlayController.getTopOverlay();

        if (topOverlay && topOverlay.closeOnPressEscape) {
            topOverlay.hide();
        }
    }
};

if (typeof window !== 'undefined') {
    // Handle `esc` key when the popup is shown
    window.addEventListener('keydown', (e) => {
        if (isKey('esc', e)) { OverlayController.onPressEscape(); }
    });
}

export default OverlayController;

