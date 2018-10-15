import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'Collapsible',
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
            type: [Array, String, Number],
            default () {
                return [];
            }
        }
    },
    data() {
        return {
            active: [].concat(this.value)
        };
    },
    provide() {
        return {
            collapsible: this
        };
    },
    watch: {
        value (value) {
            this.active = [].concat(value);
        }
    },
    methods: {
        onItemClick(item) {
            if (this.accordion) {
                return this.active = this.active.indexOf(item.id) > -1 ? [] : [item.id];
            }

            let index = this.active.indexOf(item.id);

            if (index > -1) {
                this.active.splice(index, 1);
            } else {
                this.active.push(item.id);
            }
        }
    },
    created() {
        this.$on('item-click', this.onItemClick);
    }
};