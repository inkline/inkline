import { defineElement } from '../../../../../utils';

export const blockquote = defineElement({
    fontSize: 'var(--font-size)',
    margin: {
        top: 0,
        bottom: 'var(--margin-bottom)',
        left: 0,
        right: 0
    },
    bordered: {
        left: {
            border: {
                left: {
                    width: '5px',
                    style: 'var(--border-style)',
                    color: 'var(--border-color)'
                }
            },
            padding: {
                left: 'var(--padding-left)'
            }
        },
        right: {
            border: {
                right: {
                    width: '5px',
                    style: 'var(--border-style)',
                    color: 'var(--border-color)'
                }
            },
            padding: {
                right: 'var(--padding-right)'
            }
        }
    },
    footer: {
        color: 'var(--text-color-weak)',
        fontSize: '80%'
    }
});
