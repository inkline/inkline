<template>
    <INav class="texs">
        <INavItem href="https://inkline.io">Link</INavItem>
        <INavItem :to="{ path: '/docs/components/nav' }">Router Link</INavItem>
        <INavItem>Item</INavItem>
        <INavItem disabled>Disabled</INavItem>
    </INav>
</template>
