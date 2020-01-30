<script>
import ActiveClassPropertyMixin from '@inkline/inkline/src/mixins/components/properties/ActiveClassPropertyMixin'

export default {
    extends: ActiveClassPropertyMixin,
    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
};
</script>
