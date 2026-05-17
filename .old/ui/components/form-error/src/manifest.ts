import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'FormError',
        props: [
            {
                name: 'for',
                type: 'string',
                description: 'The schema path of the target input to show the errors for.',
                default: ''
            },
            {
                name: 'visible',
                type: 'FormStateKeys[] | boolean',
                description:
                    'Set the validation statuses for which the form error should be visible.',
                default: "'touched', 'dirty', 'invalid'"
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: 'form-error',
            variables: [
                {
                    name: '--form-error--color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--form-error--font-size',
                    value: 'var(--font-size--sm)'
                },
                {
                    name: '--form-error--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--form-error--margin-right',
                    value: '0'
                },
                {
                    name: '--form-error--margin-bottom',
                    value: '0'
                },
                {
                    name: '--form-error--margin-left',
                    value: '0'
                },
                {
                    name: '--form-error--margin',
                    value: 'var(--form-error--margin-top) var(--form-error--margin-right) var(--form-error--margin-bottom) var(--form-error--margin-left)'
                }
            ]
        }
    }
];

export default manifest;
