import { defaultModalContainerId, defaultToastContainerId } from '../../constants';

export function cleanupInkline() {
    document.querySelector(`#${defaultModalContainerId}`)?.remove();
    document.querySelector(`#${defaultToastContainerId}`)?.remove();
}
