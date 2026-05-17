<template>
    <Navbar>
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible>
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <NavItem to="/about"> About </NavItem>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
            <Input placeholder="Type something.." class="_margin-left:1">
                <template #append>
                    <Button color="primary">
                        <Icon name="ink-search" />
                    </Button>
                </template>
            </Input>
        </NavbarCollapsible>
    </Navbar>
</template>
