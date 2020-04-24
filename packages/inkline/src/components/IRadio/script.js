import ICheckable from '@inkline/inkline/src/components/ICheckable';

export default {
    name: 'IRadio',
    extends: ICheckable,
    computed: {
        currentValue() {
            return this.isGrouped ? this.value : (this.$attrs || {}).value;
        },
        checked() {
            return this.model === this.currentValue;
        }
    }
};
