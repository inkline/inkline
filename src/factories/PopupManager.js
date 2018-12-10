import Vue from 'vue';
import { addClass, removeClass, isKey } from 'inkline/helpers/index';

class PopupManager {
    instances = {};

    modalStack = [];
    modalFade = true;

    hasModal = false;
    zIndex = 2000;
    
    constructor() {
        if (!Vue.prototype.$isServer) {
            // handle `esc` key when the popup is shown
            window.addEventListener('keydown', (e) => {
                if (isKey('esc', e)) {
                    const topPopup = this.getTopPopup();

                    if (topPopup && topPopup.closeOnPressEscape) {
                        topPopup.handleClose
                            ? topPopup.handleClose()
                            : (topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close());
                    }
                }
            });
        }
    }

    getInstance(id) {
        return this.instances[id];
    }

    register(id, instance) {
        if (id && instance) {
            this.instances[id] = instance;
        }
    }

    unregister(id) {
        if (id) {
            this.instances[id] = null;
            delete this.instances[id];
        }
    }

    nextZIndex() {
        return this.zIndex++;
    }

    doOnModalClick() {
        const topItem = this.modalStack[this.modalStack.length - 1];

        if (!topItem) return;

        const instance = this.getInstance(topItem.id);
        if (instance && instance.closeOnClickModal) {
            instance.close();
        }
    }

    getModal() {
        if (Vue.prototype.$isServer) {
            return;
        }

        let modalDom = this.modalDom;

        if (modalDom) {
            this.hasModal = true;
        } else {
            this.hasModal = false;
            modalDom = document.createElement('div');
            this.modalDom = modalDom;

            modalDom.addEventListener('touchmove', (event) => {
                event.preventDefault();
                event.stopPropagation();
            });

            modalDom.addEventListener('click', () => {
                this.doOnModalClick && this.doOnModalClick();
            });
        }

        return modalDom;
    }
    
    openModal(id, zIndex, dom, modalClass, modalFade) {
        if (Vue.prototype.$isServer) return;
        if (!id || zIndex === undefined) return;
        this.modalFade = modalFade;

        const modalStack = this.modalStack;

        for (let i = 0, j = modalStack.length; i < j; i++) {
            const item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }

        const modalDom = this.getModal();

        addClass(modalDom, 'v-modal');

        if (this.modalFade && !this.hasModal) {
            addClass(modalDom, 'v-modal-enter');
        }

        if (modalClass) {
            let classArr = modalClass.trim().split(/\s+/);
            classArr.forEach(item => addClass(modalDom, item));
        }

        setTimeout(() => {
            removeClass(modalDom, 'v-modal-enter');
        }, 200);

        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom);
        } else {
            document.body.appendChild(modalDom);
        }

        if (zIndex) {
            modalDom.style.zIndex = zIndex;
        }

        modalDom.tabIndex = 0;
        modalDom.style.display = '';

        this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    }

    closeModal(id) {
        const modalStack = this.modalStack;
        const modalDom = this.getModal();

        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];

            if (topItem.id === id) {
                if (topItem.modalClass) {
                    let classArr = topItem.modalClass.trim().split(/\s+/);
                    classArr.forEach(item => removeClass(modalDom, item));
                }

                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            } else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }
        }

        if (modalStack.length === 0) {
            if (this.modalFade) {
                addClass(modalDom, 'v-modal-leave');
            }

            setTimeout(() => {
                if (modalStack.length === 0) {
                    if (modalDom.parentNode) {
                        modalDom.parentNode.removeChild(modalDom);
                    }
                    modalDom.style.display = 'none';

                    this.modalDom = undefined;
                }

                removeClass(modalDom, 'v-modal-leave');
            }, 200);
        }
    }

    getTopPopup() {
        if (Vue.prototype.$isServer) return;
        if (this.modalStack.length > 0) {
            const topPopup = this.modalStack[this.modalStack.length - 1];

            if (!topPopup) return;

            return this.getInstance(topPopup.id);
        }
    }
}


export const popupManager = new PopupManager();
export default popupManager;

