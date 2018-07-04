import ClickableFormItem from '../../mixins/forms/ClickableFormItem';
import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import FocusableFormItem from '../../mixins/forms/FocusableFormItem';
import InjectableFormItem from '../../mixins/forms/InjectableFormItem';
import TabableFormItem from '../../mixins/forms/TabableFormItem';

import AttributableComponent from '../../mixins/components/AttributableComponent';
import ClassableComponent from '../../mixins/components/ClassableComponent';
import ClickableComponent from '../../mixins/components/ClickableComponent';
import FocusableComponent from '../../mixins/components/FocusableComponent';
import HoverableComponent from '../../mixins/components/HoverableComponent';
import LoadableComponent from '../../mixins/components/LoadableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';
import ThemeableComponent from '../../mixins/components/ThemeableComponent';

export default {
    name: 'Button',
    mixins: [
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        InjectableFormItem,
        TabableFormItem,

        AttributableComponent,
        ClassableComponent,
        ClickableComponent,
        FocusableComponent,
        HoverableComponent,
        LoadableComponent,
        SizeableComponent,
        ThemeableComponent
    ],
    props: {
        /**
         * Modifiers
         */
        active: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        link: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button'
        },

        /**
         * Icon
         */
        icon: {
            type: String,
            default: ''
        },

        /**
         * Linking and routing
         */
        href: {
            type: [String, Object],
            default: ''
        }
    },
    computed: {
        hrefAttr () {
            return this.href && typeof this.href === 'string' && this.tag === 'a' ? this.href : false;
        }
    },
    methods: {
        /**
         * On click binding to make buttons behave like anchor links
         */
        onClickHref () {
            if (!this.href) return;

            if (typeof this.href === 'string' && /^(https?:)?\/?\//.test(this.href)) {
                if (this.tag === 'a') return;

                window.open(this.href, this.$attrs.target || '_self');
            } else {
                this.$router.push(this.href);
            }
        }
    },
    created () {
        if (this.href) {
            this.$on('click', this.onClickHref);
        }

        if (this.classesProvider && this.attributesProvider) {
            this.classesProvider['root'].push(() => ({ '-active': this.active }));
            this.classesProvider['root'].push(() => ({ '-block': this.block }));
            this.classesProvider['root'].push(() => ({ '-circle': this.circle }));
            this.classesProvider['root'].push(() => ({ '-flat': this.flat }));
            this.classesProvider['root'].push(() => ({ '-link': this.link }));
            this.classesProvider['root'].push(() => ({ '-outline': this.outline }));

            this.attributesProvider.push(() => ({ 'aria-pressed': this.active ? 'true' : false }));
        }
    }
};
