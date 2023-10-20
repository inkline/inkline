/* eslint-disable vue/one-component-per-file */
import { IButton } from '@inkline/inkline/components/IButton';
import { IInput } from '@inkline/inkline/components/IInput';
import { translate } from '@inkline/inkline/i18n';
import type { ModalOptions } from '@inkline/inkline/plugins/modal';
import { uid } from '@grozav/utils';
import { computed, defineComponent, h, markRaw, ref, VNode } from 'vue';
import { useModalBuilder } from '@inkline/inkline/composables/modals/builder';
import { useForm } from '@inkline/inkline/composables';
import { validateSchema } from '@inkline/inkline/validation';
import { IForm } from '@inkline/inkline/components/IForm';
import { IFormGroup } from '@inkline/inkline/components/IFormGroup';
import { IFormError } from '@inkline/inkline/components/IFormError';

export function usePrompt() {
    const modalService = useModalBuilder();

    return (
        options: {
            title?: string;
            message?: string;
            confirmButtonText?: string;
            confirmButtonProps?: Record<string, unknown>;
            cancelButtonText?: string;
            cancelButtonProps?: Record<string, unknown>;
            inputs?: VNode[];
            inputProps?: Record<string, unknown>;
            schema?: Record<string, unknown>;
        } & Partial<ModalOptions>
    ) =>
        new Promise<Record<string, unknown>>((resolve, reject) => {
            const id = uid('prompt');
            const schema = ref(
                useForm(
                    options.schema || {
                        input: {
                            validators: ['required']
                        }
                    }
                )
            );
            const disabled = computed(() => schema.value.invalid || schema.value.pristine);

            modalService.show({
                id,
                type: 'prompt',
                onClose: () => reject(new Error('Prompt cancelled')),
                header: options.title,
                body:
                    options.body ||
                    h('div', [
                        h('p', options.message),
                        h(
                            IForm,
                            {
                                modelValue: schema,
                                'onUpdate:modelValue'(value: Record<string, unknown>) {
                                    schema.value = value;
                                }
                            },
                            () => [
                                ...(options.inputs ?? [
                                    h(IFormGroup, {}, () => [
                                        h(IInput, {
                                            name: 'input',
                                            placeholder: 'Enter a value...',
                                            ...options.inputProps
                                        }),
                                        h(IFormError, {
                                            for: 'input'
                                        })
                                    ])
                                ])
                            ]
                        )
                    ]),
                footer:
                    options.footer ||
                    markRaw(
                        defineComponent({
                            setup() {
                                return () =>
                                    h('div', [
                                        h(
                                            IButton,
                                            {
                                                onClick: () => {
                                                    modalService.hide({ id });
                                                    reject(new Error('Prompt cancelled'));
                                                },
                                                ...options.cancelButtonProps
                                            },
                                            () =>
                                                options.cancelButtonText ??
                                                translate('modals.cancel')
                                        ),
                                        h(
                                            IButton,
                                            {
                                                onClick: async () => {
                                                    schema.value = await validateSchema(
                                                        schema.value
                                                    );

                                                    if (schema.value.valid) {
                                                        modalService.hide({ id });
                                                        resolve(schema.value);
                                                    }
                                                },
                                                disabled: disabled.value,
                                                color: 'primary',
                                                ...options.confirmButtonProps
                                            },
                                            () =>
                                                options.confirmButtonText ??
                                                translate('modals.confirm')
                                        )
                                    ]);
                            }
                        })
                    ),
                ...options
            });
        });
}
