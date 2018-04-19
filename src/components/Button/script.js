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
    name: 'Button',
    mixins: [
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        InjectableFormItem,
        TabableFormItem,

        ClassableComponent,
        FocusableComponent,
        HoverableComponent,
        SizeableComponent
    ]
};


    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean
    }
