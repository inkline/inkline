import { defineComponent } from "vue";
import { LinkableMixin } from "@inkline/inkline/mixins";
import { Classes } from "@inkline/inkline/types";

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

const componentName = "IBreadcrumbItem";

export default defineComponent({
    name: componentName,
    mixins: [LinkableMixin],
    inheritAttrs: false,
    props: {
        /**
         * The active state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false,
        },
        /**
         * The disabled state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The href property of the breadcrumb item rendered as anchor
         * @type string
         * @default undefined
         * @name href
         */
        href: {
            type: String,
            default: "",
        },
        /**
         * The to property of the breadcrumb item rendered as router link component
         * @type string | object
         * @default undefined
         * @name to
         */
        to: {
            type: [String, Object],
            default: "",
        },
        /**
         * The tabindex of the breadcrumb item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0,
        },
    },
    computed: {
        classes(): Classes {
            return {
                "-active": this.active,
                "-disabled": this.disabled,
            };
        },
        tabIndex(): number | string {
            return this.disabled || this.active ? -1 : this.tabindex;
        },
    },
});
