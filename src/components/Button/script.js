import ClickableFormItem from '../../mixins/forms/ClickableFormItem';
import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import FocusableFormItem from '../../mixins/forms/FocusableFormItem';
import InjectableFormItem from '../../mixins/forms/InjectableFormItem';
import TabableFormItem from '../../mixins/forms/TabableFormItem';

import ClassableComponent from '../../mixins/components/ClassableComponent';
import ClickableComponent from '../../mixins/components/ClickableComponent';
import FocusableComponent from '../../mixins/components/FocusableComponent';
import HoverableComponent from '../../mixins/components/HoverableComponent';
import LoadableComponent from '../../mixins/components/LoadableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';
import ThemeableComponent from '../../mixins/components/ThemeableComponent';

export default {
    name: 'Button',
    mixins: [
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        InjectableFormItem,
        TabableFormItem,

        ClassableComponent,
        ClickableComponent,
        FocusableComponent,
        HoverableComponent,
        LoadableComponent,
        SizeableComponent,
        ThemeableComponent
    ],
    props: {
        icon: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'button'
        }
    }
};

// props: {
//     type: {
//         type: String,
//         default: 'default'
//     },
//     size: String,
//     icon: {
//         type: String,
//         default: ''
//     },
//     nativeType: {
//         type: String,
//         default: 'button'
//     },
//     loading: Boolean,
//     disabled: Boolean,
//     plain: Boolean,
//     autofocus: Boolean,
//     round: Boolean,
//     circle: Boolean
// }
