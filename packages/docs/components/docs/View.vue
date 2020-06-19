<style lang="scss">
article {
    > h1:first-child + h2 {
        line-height: 30px;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        font-size: 1.2rem;
        font-weight: 300;
    }
}
</style>

<script>
/* eslint-disable vue/no-unused-components */
import ICode from '~/components/docs/Code.vue';
import ApiTable from '~/components/docs/ApiTable.vue';
import ApiTableRow from '~/components/docs/ApiTableRow.vue';

import { head } from '~/helpers/head';

export default {
    name: 'View',
    head: head(),
    layout: 'documentation',
    components: {
        ApiTable,
        ApiTableRow,
        ICode
    },
    mounted() {
        this.$nuxt.$emit('viewLoaded');
    }
};
</script>
