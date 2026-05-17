import { TabsKey } from '@inkline/types';
import { ref } from 'vue';

export function createTestingTabsProvide({ active = 'tab' } = {}) {
    return {
        [TabsKey as symbol]: {
            color: ref('light'),
            size: ref('md'),
            active: ref(active),
            seo: ref(true)
        }
    };
}
