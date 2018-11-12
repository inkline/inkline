import PopupProviderMixin from 'inkline/mixins/components/providers/PopupProviderMixin';

export default {
    name: 'IDropdownMenu',
    inject: ['dropdown'],
    mixins: [
        PopupProviderMixin
    ],
    props: {
        visibleArrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 0
        }
    },
};
