import { defaultModalContainerId, defaultToastContainerId } from '@inkline/inkline/constants';

export function cleanupInkline() {
    document.querySelector(`#${defaultModalContainerId}`)?.remove();
    document.querySelector(`#${defaultToastContainerId}`)?.remove();
}
