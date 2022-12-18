<template>
    <INav>
        <INavItem :to="{ name: 'docs-components-nav' }" exact-active-class="-active">
            Active Router Link
        </INavItem>
        <INavItem active> Active Item </INavItem>
    </INav>
</template>
