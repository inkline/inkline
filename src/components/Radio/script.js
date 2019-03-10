import Checkable from '@inkline/inkline/src/components/Checkable';

export default {
    name: 'IRadio',
    extends: Checkable,
    computed: {
        currentValue() {
            return this.isGrouped ? this.value : (this.$attrs || {}).value;
        },
        checked() {
            return this.model === this.currentValue;
        }
    }
};
