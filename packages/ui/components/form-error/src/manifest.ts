import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'FormError',
        props: [
            {
                name: 'for',
                type: 'String',
                description: 'The schema path of the target input to show the errors for.',
                default: ''
            },
            {
                name: 'visible',
                type: 'FormStateKeys[]',
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
                    name: '--form-error--color'
                },
                {
                    name: '--form-error--font-size'
                },
                {
                    name: '--form-error--margin-top'
                },
                {
                    name: '--form-error--margin-right'
                },
                {
                    name: '--form-error--margin-bottom'
                },
                {
                    name: '--form-error--margin-left'
                },
                {
                    name: '--form-error--margin'
                }
            ]
        }
    }
];

export default manifest;
