import Vue from 'vue';
import { isKey } from 'inkline/helpers/index';

export class PopupManager {
    instances = {};
    modalStack = [];
    zIndex = 2000;

    constructor() {
        if (!Vue.prototype.$isServer) {
            // Handle `esc` key when the popup is shown
            window.addEventListener('keydown', (e) => {
                if (isKey('esc', e)) {
                    const topPopup = this.getTopPopup();

                    if (topPopup && topPopup.closeOnPressEscape) {
                        topPopup.close();
                    }
                }
            });
        }
    }

    register(instance) {
        if (instance && instance.id) {
            this.instances[instance.id] = instance;
        }
    }

    unregister(instance) {
        if (instance && instance.id) {
            this.instances[instance.id] = null;
            delete this.instances[instance.id];
        }
    }

    nextZIndex() {
        return this.zIndex++;
    }

    openModal(id) {
        if (Vue.prototype.$isServer) return;

        const modal = this.modalStack.find((m) => m.id === id);

        if (modal) {
            modal.$el.style.zIndex = this.nextZIndex();
        } else {
            this.modalStack.push({ id: id });
        }
    }

    closeModal(id) {
        const modalIndex = this.modalStack.findIndex((m) => m.id === id);

        this.modalStack.splice(modalIndex, 1);
    }

    getTopPopup() {
        if (Vue.prototype.$isServer) return;

        if (this.modalStack.length > 0) {
            const topPopup = this.modalStack[this.modalStack.length - 1];

            if (!topPopup) return;

            return this.instances[topPopup.id];
        }
    }
}


export const popupManager = new PopupManager();
export default popupManager;

