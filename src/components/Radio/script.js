import Checkable from 'inkline/components/Checkable';

export default {
    name: 'IRadio',
    extends: Checkable,
    computed: {
        checked () {
            return this.model === this.currentValue;
        }
    }
};
