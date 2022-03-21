import { ref } from 'vue';

export default {
    setup () {
        const items = ref([
            { title: 'Home', href: '/' },
            { title: 'Components', to: 'components' },
            { title: 'Breadcrumbs', active: true }
        ]);

        return { items };
    }
};
