import Checkable from '@inkline/inkline/components/Checkable';

export default {
    name: 'IRadio',
    extends: Checkable,
    computed: {
        currentValue () {
            return this.isGrouped ? this.value : (this.$attrs || {}).value;
        },
        checked () {
            return this.model === this.currentValue;
        }
    }
};
