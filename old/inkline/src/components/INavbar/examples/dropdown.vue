<template>
    <INavbar>
        <INavbarBrand to="/"> Navbar </INavbarBrand>
        <INavbarCollapsible>
            <INav>
                <INavItem to="/"> Home </INavItem>
                <IDropdown>
                    <INavItem stop-propagation>Dropdown</INavItem>
                    <template #body>
                        <IDropdownItem>Action</IDropdownItem>
                        <IDropdownItem>Another action</IDropdownItem>
                        <IDropdownItem disabled>Disabled action</IDropdownItem>
                        <IDropdownDivider />
                        <IDropdownItem>Separated item</IDropdownItem>
                    </template>
                </IDropdown>
                <INavItem to="/contact"> Contact </INavItem>
            </INav>
        </INavbarCollapsible>
    </INavbar>
</template>
