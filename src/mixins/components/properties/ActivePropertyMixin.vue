<script>
import ActiveClassPropertyMixin from '@inkline/inkline/mixins/components/properties/ActiveClassPropertyMixin'

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
