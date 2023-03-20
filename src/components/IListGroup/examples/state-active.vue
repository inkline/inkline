<template>
    <IListGroup>
        <IListGroupItem :to="{ path: '/docs/components/list-group' }" exact-active-class="-active">
            Active Router Link
        </IListGroupItem>
        <IListGroupItem :to="{ path: '/docs' }" active> Active Item </IListGroupItem>
    </IListGroup>
</template>
