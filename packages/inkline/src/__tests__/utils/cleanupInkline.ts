import { defaultModalContainerId, defaultToastContainerId } from '@inkline/inkline';

export function cleanupInkline() {
    document.querySelector(`#${defaultModalContainerId}`)?.remove();
    document.querySelector(`#${defaultToastContainerId}`)?.remove();
}
