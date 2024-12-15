import { unref } from 'vue';
import { ModalInstance, OverlayService } from '../types';

export function createOverlayService(): OverlayService {
    const instances: Record<string, ModalInstance | undefined> = {};
    const stack: string[] = [];

    let zIndex = 1050;

    function register(instance: ModalInstance) {
        const name = unref(instance.name);

        if (name) {
            instances[name] = instance;
        }
    }

    function unregister(instance: ModalInstance) {
        const name = unref(instance.name);

        if (name) {
            instances[name] = undefined;

            delete instances[name];
        }
    }

    function open(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        stack.push(name);

        const element = unref(instances[name]?.elementRef);
        if (element) {
            element.style.zIndex = `${zIndex++}`;
        }
    }

    function close(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        stack.splice(stack.indexOf(name), 1);
    }

    function getTopOverlay(): ModalInstance | undefined {
        const topOverlayName: string = stack.slice(-1)[0] || '';

        return instances[topOverlayName];
    }

    function onPressEscape() {
        const topOverlay = getTopOverlay();

        if (topOverlay && topOverlay.closeOnPressEscape) {
            topOverlay.hide();
        }
    }

    return {
        instances,
        stack,
        zIndex,
        register,
        unregister,
        getTopOverlay,
        open,
        close,
        onPressEscape
    };
}
