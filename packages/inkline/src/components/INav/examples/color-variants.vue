<template>
    <INav color="light" class="_background:light">
        <INavItem href="https://inkline.io">Link</INavItem>
        <INavItem :to="{ path: '/docs/components/nav' }">Router Link</INavItem>
        <INavItem>Item</INavItem>
        <INavItem>Item</INavItem>
        <INavItem disabled>Disabled</INavItem>
    </INav>

    <INav color="dark" class="_background:dark">
        <INavItem href="https://inkline.io">Link</INavItem>
        <INavItem :to="{ path: '/docs/components/nav' }">Router Link</INavItem>
        <INavItem>Item</INavItem>
        <INavItem>Item</INavItem>
        <INavItem disabled>Disabled</INavItem>
    </INav>
</template>
