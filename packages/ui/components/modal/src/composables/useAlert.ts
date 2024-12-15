import { Button } from '@inkline/component-button';
import { translate } from '@inkline/i18n';
import { uid } from '@inkline/utils';
import { h } from 'vue';
import { useModalBuilder } from './useModalBuilder';
import { ModalOptions } from '../types';

export function useAlert() {
    const builder = useModalBuilder();

    return (
        options: ModalOptions & {
            title?: string;
            message?: string;
            confirmButtonText?: string;
            confirmButtonProps?: Record<string, unknown>;
        }
    ) =>
        new Promise<void>((resolve) => {
            const id = uid('alert');
            builder.show({
                id,
                type: 'alert',
                onClose: () => resolve(),
                header: options.title,
                body: options.message,
                footer:
                    options.footer ||
                    h(
                        Button,
                        {
                            onClick: () => {
                                builder.hide({ id });
                            },
                            color: 'primary',
                            ...options.confirmButtonProps
                        },
                        () => options.confirmButtonText ?? translate('modals.confirm')
                    ),
                ...options
            });
        });
}
