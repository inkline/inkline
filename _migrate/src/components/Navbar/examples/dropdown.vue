<template>
    <Navbar>
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible>
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <Dropdown>
                    <NavItem stop-propagation>Dropdown</NavItem>
                    <template #body>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another action</DropdownItem>
                        <DropdownItem disabled>Disabled action</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>Separated item</DropdownItem>
                    </template>
                </Dropdown>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
        </NavbarCollapsible>
    </Navbar>
</template>
