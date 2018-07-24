import ClickableFormItem from '../../mixins/forms/ClickableFormItem';
import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import FocusableFormItem from '../../mixins/forms/FocusableFormItem';
import InjectableFormItem from '../../mixins/forms/InjectableFormItem';
import TabableFormItem from '../../mixins/forms/TabableFormItem';

import AttributableComponent from '../../mixins/components/AttributableComponent';
import ClassableComponent from '../../mixins/components/ClassableComponent';
import ClickableComponent from '../../mixins/components/ClickableComponent';
import FocusableComponent from '../../mixins/components/FocusableComponent';
import HoverableComponent from '../../mixins/components/HoverableComponent';
import LoadableComponent from '../../mixins/components/LoadableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';

export default {
    name: 'ButtonGroup',
    mixins: [
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        InjectableFormItem,
        TabableFormItem,

        AttributableComponent,
        ClassableComponent,
        ClickableComponent,
        FocusableComponent,
        HoverableComponent,
        LoadableComponent,
        SizeableComponent
    ],
    props: {
        /**
         * Modifiers
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({ '-vertical': this.vertical }));
        }
    }
};
