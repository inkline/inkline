<script>
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/properties/DisabledPropertyMixin';

export default {
    ...DisabledPropertyMixin,
    computed: {
        /**
         * Check whether the form item or one of its form parents is disabled
         */
        isDisabled() {
            return (this.parentForm || {}).isDisabled || (this.parentFormGroup || {}).isDisabled || this.disabled;
        }
    },
};
</script>
