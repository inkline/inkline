import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import ChangeableComponent from '../../mixins/ChangeableComponent';
import ClassableComponent from '../../mixins/ClassableComponent';
import ClearableFormItem from '../../mixins/ClearableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FocusableComponent from '../../mixins/FocusableComponent';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';
import HoverableComponent from '../../mixins/HoverableComponent';
import InputGroup from '../InputGroup';
import InputableFormItem from '../../mixins/InputableFormItem';
import LabelableFormItem from '../../mixins/LabelableFormItem';
import SizeableComponent from '../../mixins/SizeableComponent';

export default {
    name: 'Input',
    inheritAttrs: false,
    extends: InputGroup,
    data () {
        return {
            nodeName: 'input'
        };
    },
    mixins: [
        BindableIndividualFormItem,
        ChangeableComponent,
        ClassableComponent,
        ClearableFormItem,
        DisableableFormItem,
        FocusableComponent,
        FormItem,
        GroupableFormItem,
        HoverableComponent,
        InputableFormItem,
        LabelableFormItem,
        SizeableComponent
    ],
    created () {
        if (this.classesProvider) {
            this.classesProvider['child'].push(() => ({
                '-prefixed': this.$slots.prefix,
                '-suffixed': this.$slots.suffix,
                '-prepended': this.$slots.prepend,
                '-appended': this.$slots.append
            }));
        }
    }
};
