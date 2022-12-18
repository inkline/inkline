<template>
    <IListGroup>
        <IListGroupItem :to="{ name: 'docs-components-list-group' }" exact-active-class="-active">
            Active Router Link
        </IListGroupItem>
        <IListGroupItem :to="{ name: 'index' }" active> Active Item </IListGroupItem>
    </IListGroup>
</template>
