<template>
    <INav>
        <INavItem :to="{ path: '/docs/components/nav' }" exact-active-class="-active">
            Active Router Link
        </INavItem>
        <INavItem active> Active Item </INavItem>
    </INav>
</template>
