import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';

export default {
    name: 'INavbarBrand',
    mixins: [
        AttributesProviderMixin
    ],
    computed: {
        isTag () {
            return this.attributes.to ? 'router-link' : 'a';
        }
    }
};