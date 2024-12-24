import { IButton } from '@inkline/inkline/components/IButton';
import { translate } from '@inkline/inkline/i18n';
import type { ModalOptions } from '@inkline/inkline/types';
import { uid } from '@grozav/utils';
import { h } from 'vue';
import { useModalBuilder } from '@inkline/inkline/composables/modals/builder';

export function useAlert() {
    const builder = useModalBuilder();

    return (
        options: {
            title?: string;
            message?: string;
            confirmButtonText?: string;
            confirmButtonProps?: Record<string, unknown>;
        } & Partial<ModalOptions>
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
                        IButton,
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
