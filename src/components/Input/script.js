import InputGroup from '../InputGroup';

import BindableIndividualFormItem from '../../mixins/forms/BindableIndividualFormItem';
import ClearableFormItem from '../../mixins/forms/ClearableFormItem';
import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import FocusableFormItem from '../../mixins/forms/FocusableFormItem';
import GroupableFormItem from '../../mixins/forms/GroupableFormitem';
import InjectableFormItem from '../../mixins/forms/InjectableFormItem';
import InputableFormItem from '../../mixins/forms/InputableFormItem';
import LabelableFormItem from '../../mixins/forms/LabelableFormItem';

import ChangeableComponent from '../../mixins/components/ChangeableComponent';
import ClassableComponent from '../../mixins/components/ClassableComponent';
import FocusableComponent from '../../mixins/components/FocusableComponent';
import HoverableComponent from '../../mixins/components/HoverableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';

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
        ClearableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        GroupableFormItem,
        InjectableFormItem,
        InputableFormItem,
        LabelableFormItem,

        ChangeableComponent,
        ClassableComponent,
        FocusableComponent,
        HoverableComponent,
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
