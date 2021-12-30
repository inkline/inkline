import { isKey } from '@inkline/inkline/helpers';

export const OverlayController = {
    instances: {} as { [key: string]: any },
    stack: [] as string[],
    zIndex: 1050,
    register (instance: any) {
        if (instance && instance.name) {
            OverlayController.instances[instance.name] = instance;
        }
    },
    unregister (instance: any) {
        if (instance && instance.name) {
            OverlayController.instances[instance.name] = null;

            delete OverlayController.instances[instance.name];
        }
    },
    open (name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.push(name);
        OverlayController.instances[name].$el.style.zIndex = OverlayController.zIndex++;
    },
    close (name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.splice(OverlayController.stack.indexOf(name), 1);
    },
    getTopOverlay (): any {
        const topOverlayName: string = OverlayController.stack.slice(-1)[0] || '';

        return OverlayController.instances[topOverlayName];
    },
    onPressEscape () {
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
