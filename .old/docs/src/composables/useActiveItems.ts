import type { NavigationItem } from '~/types';
import { useRoute } from '#vue-router';
import { computed, unref } from 'vue';

export function useActiveItems(items: MaybeRefOrGetter<NavigationItem[]>) {
    const route = useRoute();

    const activeItems = computed(() => {
        const itemsValue = unref(items) as NavigationItem[];

        return itemsValue.reduce<Record<string, boolean>>((acc, item) => {
            if (item.to === route.path) {
                acc[item.id] = true;
            }

            if (item.active) {
                const activeCondition = Array.isArray(item.active) ? item.active : [item.active];

                activeCondition.forEach((condition) => {
                    if (typeof condition === 'string' && condition === route.path) {
                        acc[item.id] = true;
                    } else if (condition instanceof RegExp && condition.test(route.path)) {
                        acc[item.id] = true;
                    }
                });
            }

            if (item.children) {
                item.children.forEach((child) => {
                    if (child.to === route.path) {
                        acc[item.id] = true;
                        acc[`${item.id}/${child.id}`] = true;
                    }

                    if (child.children) {
                        child.children.forEach((subchild) => {
                            if (subchild.to === route.path) {
                                acc[item.id] = true;
                                acc[`${item.id}/${child.id}`] = true;
                                acc[`${item.id}/${child.id}/${subchild.id}`] = true;
                            }
                        });
                    }
                });
            }
            return acc;
        }, {});
    });

    return {
        activeItems
    };
}
