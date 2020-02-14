import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'ICollapsible',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        VariantPropertyMixin
    ],
    props: {
        accordion: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data() {
        return {
            activeItems: [].concat(this.value)
        };
    },
    provide() {
        return {
            collapsible: this
        };
    },
    watch: {
        value(value) {
            this.activeItems = [].concat(value);
        }
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

            this.$emit('input', this.activeItems);
        }
    },
    created() {
        this.$on('item-click', this.onItemClick);
    }
};
