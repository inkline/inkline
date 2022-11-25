import { Ref, unref } from 'vue';

interface ModalInstance {
    name: Ref<string>;
    elementRef: Ref<HTMLElement | null>;
    closeOnPressEscape: Ref<boolean>;
    hide: () => void;
}

export const OverlayController = {
    instances: {} as { [key: string]: any },
    stack: [] as string[],
    zIndex: 1050,
    register(instance: ModalInstance) {
        const name = unref(instance.name);

        if (name) {
            OverlayController.instances[name] = instance;
        }
    },
    unregister(instance: ModalInstance) {
        const name = unref(instance.name);

        if (name) {
            OverlayController.instances[name] = null;

            delete OverlayController.instances[name];
        }
    },
    open(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.push(name);

        const element = unref(OverlayController.instances[name].elementRef);
        if (element) {
            element.style.zIndex = OverlayController.zIndex++;
        }
    },
    close(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        OverlayController.stack.splice(OverlayController.stack.indexOf(name), 1);
    },
    getTopOverlay(): ModalInstance {
        const topOverlayName: string = OverlayController.stack.slice(-1)[0] || '';

        return OverlayController.instances[topOverlayName];
    },
    onPressEscape() {
        const topOverlay = OverlayController.getTopOverlay();

        if (topOverlay && topOverlay.closeOnPressEscape) {
            topOverlay.hide();
        }
    }
};

export default OverlayController;
