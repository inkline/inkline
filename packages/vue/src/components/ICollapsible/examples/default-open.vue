<script>
export default {
    data() {
        return {
            open: ['collapsible-item-1']
        };
    }
};
</script>
<template>
    <ICollapsible v-model="open">
        <ICollapsibleItem name="collapsible-item-1" title="Item 1">
            Item 1 content
        </ICollapsibleItem>
        <ICollapsibleItem name="collapsible-item-2" title="Item 2">
            Item 2 content
        </ICollapsibleItem>
        <ICollapsibleItem name="collapsible-item-3" title="Item 3">
            Item 3 content
        </ICollapsibleItem>
    </ICollapsible>
</template>
