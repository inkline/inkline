<template>
    <IListGroup>
        <IListGroupItem active>Active</IListGroupItem>
        <IListGroupItem href="https://inkline.io">Link</IListGroupItem>
        <IListGroupItem :to="{ path: '/docs/components/list-group' }">Router Link</IListGroupItem>
        <IListGroupItem>Item</IListGroupItem>
        <IListGroupItem disabled>Disabled</IListGroupItem>
    </IListGroup>
</template>
