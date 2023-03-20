<template>
    <INavbar>
        <INavbarBrand :to="{ path: '/docs/components/navbar' }">Navbar</INavbarBrand>
        <INavbarCollapsible>
            <INav>
                <INavItem :to="{ path: '/docs/components/navbar' }" exact-active-class="-active">
                    Active Router Link
                </INavItem>
                <INavItem active> Active Item </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>
</template>
