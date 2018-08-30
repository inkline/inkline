import AttributableComponent from '../../mixins/components/providers/AttributesProviderMixin';
import ClassableComponent from '../../mixins/components/providers/ClassesProviderMixin';
import SizeableComponent from '../../mixins/components/properties/SizePropertyMixin';
import ThemeableComponent from '../../mixins/components/properties/ThemePropertyMixin';

export default {
    name: 'Card',
    mixins: [
        AttributableComponent,
        ClassableComponent,
        SizeableComponent,
        ThemeableComponent
    ]
};
