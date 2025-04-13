import { Button } from '@inkline/component-button';
import { translate } from '@inkline/i18n';
import { uid } from '@inkline/utils';
import { h } from 'vue';
import { useModalBuilder } from './useModalBuilder';
import { ModalOptions } from '../types';

export function useConfirm() {
    const builder = useModalBuilder();

    return (
        options: {
            title?: string;
            message?: string;
            confirmButtonText?: string;
            confirmButtonProps?: Record<string, unknown>;
            cancelButtonText?: string;
            cancelButtonProps?: Record<string, unknown>;
        } & Partial<ModalOptions>
    ) =>
        new Promise<boolean>((resolve) => {
            const id = uid('confirm');
            builder.show({
                id,
                type: 'confirm',
                onClose: () => resolve(false),
                header: options.title,
                body: options.message,
                footer:
                    options.footer ||
                    h('div', [
                        h(
                            Button,
                            {
                                onClick: () => {
                                    builder.hide({ id });
                                    resolve(false);
                                },
                                ...options.cancelButtonProps
                            },
                            () => options.cancelButtonText ?? translate('modals.cancel')
                        ),
                        h(
                            Button,
                            {
                                onClick: () => {
                                    builder.hide({ id });
                                    resolve(true);
                                },
                                color: 'primary',
                                ...options.confirmButtonProps
                            },
                            () => options.confirmButtonText ?? translate('modals.confirm')
                        )
                    ]),
                ...options
            });
        });
}
