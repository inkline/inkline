import { isKey } from '@grozav/utils';
import { OverlayController } from '@inkline/inkline/controllers';
import { Plugin } from 'vue';

export const OverlayPlugin: Plugin = {
    install: () => {
        if (typeof window !== 'undefined') {
            /**
             * Add global key bindings
             */

            window.addEventListener('keydown', (e) => {
                if (isKey('esc', e)) {
                    /**
                     * Handle `esc` key when a modal is shown
                     */
                    OverlayController.onPressEscape();
                }
            });
        }
    }
};
