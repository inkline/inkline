import { translate } from '@inkline/i18n';
import type { Form as FormType, FormSchema, ResolvedFormSchema } from '@inkline/types';
import { uid } from '@inkline/utils';
import type { VNode } from 'vue';
import { computed, defineComponent, h, markRaw } from 'vue';
import { useForm } from '@inkline/composables';
import { useModalBuilder } from './useModalBuilder';
import { ModalOptions } from '../types';
import { Form } from '@inkline/component-form';
import { FormGroup } from '@inkline/component-form-group';
import { FormError } from '@inkline/component-form-error';
import { Button } from '@inkline/component-button';
import { Input } from '@inkline/component-input';

type DefaultPromptFormType = {
    input: string;
    [key: string]: string;
};

export function usePrompt<T extends FormType = DefaultPromptFormType>() {
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

            const onSubmit = async () => {
                await validate();

                if (schema.value.valid) {
                    modalService.hide({ id });
                    resolve(form.value);
                }
            };

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
                            Form,
                            {
                                modelValue: schema as unknown as ResolvedFormSchema<T>,
                                'onUpdate:modelValue'(value: ResolvedFormSchema<T>) {
                                    schema.value = value;
                                }
                            },
                            () => [
                                ...(options.inputs ?? [
                                    h(FormGroup, {}, () => [
                                        h(Input, {
                                            name: 'input',
                                            placeholder: 'Enter a value...',
                                            ...options.inputProps,
                                            onKeydown: async (e: KeyboardEvent) => {
                                                if (e.key === 'Enter') {
                                                    await onSubmit();
                                                }
                                            }
                                        }),
                                        h(FormError, {
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
                                            Button,
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
                                            Button,
                                            {
                                                onClick: onSubmit,
                                                type: 'submit',
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
