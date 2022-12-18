<template>
    <INav>
        <INavItem href="https://inkline.io">Link</INavItem>
        <INavItem :to="{ name: 'index' }">Router Link</INavItem>
        <INavItem>Item</INavItem>
        <INavItem disabled>Disabled</INavItem>
    </INav>
</template>
