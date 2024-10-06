<template>
    <IListGroup>
        <IListGroupItem :to="{ path: '/' }" exact-active-class="-active">
            Active Router Link
        </IListGroupItem>
        <IListGroupItem :to="{ path: '/' }" active> Active Item </IListGroupItem>
    </IListGroup>
</template>
