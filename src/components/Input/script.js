import InputGroup from '../InputGroup';

import BindableIndividualFormItem from '../../mixins/forms/BindableIndividualFormItem';
import ClearableFormItem from '../../mixins/forms/ClearableFormItem';
import ClickableFormItem from '../../mixins/forms/ClickableFormItem';
import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import FocusableFormItem from '../../mixins/forms/FocusableFormItem';
import GroupableFormItem from '../../mixins/forms/GroupableFormitem';
import InjectableFormItem from '../../mixins/forms/InjectableFormItem';
import InputableFormItem from '../../mixins/forms/InputableFormItem';
import LabelableFormItem from '../../mixins/forms/LabelableFormItem';
import TabableFormItem from '../../mixins/forms/TabableFormItem';

import ChangeableComponent from '../../mixins/components/ChangeableComponent';
import ClassableComponent from '../../mixins/components/ClassableComponent';
import FocusableComponent from '../../mixins/components/FocusableComponent';
import HoverableComponent from '../../mixins/components/HoverableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';

export default {
    name: 'Input',
    inheritAttrs: false,
    extends: InputGroup,
    mixins: [
        BindableIndividualFormItem,
        ClearableFormItem,
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        GroupableFormItem,
        InjectableFormItem,
        InputableFormItem,
        LabelableFormItem,
        TabableFormItem,

        ChangeableComponent,
        ClassableComponent,
        FocusableComponent,
        HoverableComponent,
        SizeableComponent
    ],
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-prepended': this.$slots.prepend || this.prepended,
                '-appended': this.$slots.append || this.appended
            }));

            this.classesProvider['child'].push(() => ({
                '-prefixed': this.$slots.prefix || this.prefixed,
                '-suffixed': this.$slots.suffix || this.suffixed
            }));
        }
    }
};
