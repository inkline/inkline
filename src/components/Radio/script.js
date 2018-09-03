import Checkable from '../Checkable';

export default {
    name: 'Radio',
    mixins: [
        Checkable
    ],
    computed: {
        checked () {
            return this.model === this.currentValue;
        }
    }
};
