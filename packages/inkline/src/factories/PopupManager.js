import Vue from 'vue';
import { addClass, isKey, removeClass } from '@inkline/inkline/src/helpers/index';

export class PopupManager {
    instances = {};
    modalStack = [];
    zIndex = 1000;

    constructor() {
        if (!Vue.prototype.$isServer && window) {
            // Handle `esc` key when the popup is shown
            window.addEventListener('keydown', (e) => {
                if (isKey('esc', e)) {
                    const topPopup = this.getTopPopup();

                    if (topPopup && topPopup.closeOnPressEscape) {
                        topPopup.hide();
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
        if (Vue.prototype.$isServer || !window) { return; }

        const modal = this.modalStack.find((m) => m.id === id);

        if (modal && modal.$el) {
            modal.$el.style.zIndex = this.nextZIndex();
        } else {
            this.modalStack.push({ id: id });
        }

        addClass(window.document.body, '-modal');
    }

    closeModal(id) {
        if (Vue.prototype.$isServer || !window) { return; }

        const modalIndex = this.modalStack.findIndex((m) => m.id === id);

        this.modalStack.splice(modalIndex, 1);

        removeClass(window.document.body, '-modal');
    }

    getTopPopup() {
        if (this.modalStack.length > 0) {
            const topPopup = this.modalStack[this.modalStack.length - 1];

            if (!topPopup) return;

            return this.instances[topPopup.id];
        }
    }
}


export const popupManager = new PopupManager();
export default popupManager;

