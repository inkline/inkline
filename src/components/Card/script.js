import AttributableComponent from '../../mixins/components/AttributableComponent';
import ClassableComponent from '../../mixins/components/ClassableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';
import ThemeableComponent from '../../mixins/components/ThemeableComponent';

export default {
    name: 'Card',
    mixins: [
        AttributableComponent,
        ClassableComponent,
        SizeableComponent,
        ThemeableComponent
    ]
};
