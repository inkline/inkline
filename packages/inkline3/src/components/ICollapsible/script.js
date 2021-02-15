import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ICollapsible',
    props: {
        accordion: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        modelValue: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    provide() {
        return {
            collapsible: this
        };
    },
    data() {
        return {
            activeItems: [].concat(this.modelValue)
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            }
        },
    },
    methods: {
        onItemClick(item) {
            if (this.accordion) {
                return this.activeItems = this.activeItems.indexOf(item.id) > -1 ? [] : [item.id];
            }

            let index = this.activeItems.indexOf(item.id);

            if (index > -1) {
                this.activeItems.splice(index, 1);
            } else {
                this.activeItems.push(item.id);
            }

            this.$emit('input:modelValue', this.activeItems);
        }
    },
    watch: {
        modelValue(value) {
            this.activeItems = [].concat(value);
        }
    }
};
