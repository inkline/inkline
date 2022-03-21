import './style.scss';
import { computed, defineComponent, h } from '@inkline/paper';

/**
 * Slot for default breadcrumb item content
 * @name default
 * @kind slot
 */

/**
 * Set the HTML tag to be used for rendering the breadcrumb item
 * @name tag
 * @type String
 * @default a
 */

const componentName = 'IBreadcrumbItem';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The active state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The tabindex of the breadcrumb item
         * @type String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: String,
            default: '0'
        }
    },
    setup (props) {
        const classes = computed(() => `${
            props.className ? ` ${props.className}` : ''
        }${
            props.active ? ' -active' : ''
        }${
            props.disabled ? ' -disabled' : ''
        }`, [props.active, props.disabled, props.className]);

        const tabIndex = computed(
            () => (props.disabled || props.active) ? '-1' : props.tabindex,
            [props.disabled, props.active, props.tabindex]
        );

        return { tabIndex, classes };
    },
    render ({ active, classes, tabIndex }, { slot }) {
        return <li class={`breadcrumb-item${classes.value}`}>
            <a is="isTag" tabindex={tabIndex.value} aria-current={active ? 'location' : undefined}>
                { slot() }
            </a>
        </li>;
    }
});
