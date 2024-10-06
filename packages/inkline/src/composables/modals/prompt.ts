import { IButton } from '@inkline/inkline/components/IButton';
import { IInput } from '@inkline/inkline/components/IInput';
import { translate } from '@inkline/i18n';
import type { ModalOptions, Form, FormSchema, ResolvedFormSchema } from '@inkline/inkline/types';
import { uid } from '@inkline/utils';
import type { VNode } from 'vue';
import { computed, defineComponent, h, markRaw } from 'vue';
import { useModalBuilder } from '@inkline/inkline/composables/modals/builder';
import { useForm } from '@inkline/composables';
import { IForm } from '@inkline/inkline/components/IForm';
import { IFormGroup } from '@inkline/inkline/components/IFormGroup';
import { IFormError } from '@inkline/inkline/components/IFormError';

export function usePrompt<S extends Form = Form>() {
    const modalService = useModalBuilder();

    return <T extends Form = S>(
        options: {
            title?: string;
            message?: string;
            confirmButtonText?: string;
            confirmButtonProps?: Record<string, unknown>;
            cancelButtonText?: string;
            cancelButtonProps?: Record<string, unknown>;
            inputs?: VNode[];
            inputProps?: Record<string, unknown>;
            schema?: FormSchema<T>;
        } & Partial<ModalOptions>
    ) =>
        new Promise<T>((resolve, reject) => {
            const id = uid('prompt');
            const { schema, form, validate } = useForm<T>(
                options.schema ||
                    ({
                        input: {
                            validators: ['required']
                        }
                    } as FormSchema<T>)
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
                                'onUpdate:modelValue'(value: ResolvedFormSchema<T>) {
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
                                                    await validate();

                                                    if (schema.value.valid) {
                                                        modalService.hide({ id });
                                                        resolve(form.value);
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
