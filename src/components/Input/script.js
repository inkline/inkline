import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import ChangeableComponent from '../../mixins/ChangeableComponent';
import ClearableFormItem from '../../mixins/ClearableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FocusableComponent from '../../mixins/FocusableComponent';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';
import HoverableComponent from '../../mixins/HoverableComponent';
import InputableFormItem from '../../mixins/InputableFormItem';

export default {
    name: 'Input',
    props: {
        value: [Boolean, String],
        type: String
    },
    data () {
        return {
            slotStyles: []
        };
    },
    mixins: [
        BindableIndividualFormItem,
        ChangeableComponent,
        ClearableFormItem,
        DisableableFormItem,
        FocusableComponent,
        FormItem,
        GroupableFormItem,
        HoverableComponent,
        InputableFormItem
    ],
    computed: {
        slotClasses () {
            return [
                { '-prefixed': this.$slots.prefix },
                { '-suffixed': this.$slots.suffix }
            ];
        }
    },
    methods: {
        getSlotStyles () {
            const styles = {};
            const input = this.$el.querySelector('input');
            const currentPadding = (input.currentStyle || window.getComputedStyle(input))['padding'];
            const slots = {
                'prefix': 'padding-left',
                'suffix': 'padding-right'
            };

            for (let slot in slots) {
                // styles.push();
                // console.log(this.$el.querySelector(`.el-input-group__${slot}`).offsetWidth)
                console.log(slot, currentPadding);
            }

            return styles;
        }
    },
    mounted () {
        this.slotStyles = this.getSlotStyles();
    }
};
