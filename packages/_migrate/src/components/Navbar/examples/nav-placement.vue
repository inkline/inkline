<template>
    <Navbar>
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible class="_justify-content:flex-start">
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <NavItem to="/about"> About </NavItem>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
        </NavbarCollapsible>
    </Navbar>

    <Navbar>
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible class="_justify-content:center">
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <NavItem to="/about"> About </NavItem>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
        </NavbarCollapsible>
    </Navbar>

    <Navbar>
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible class="_justify-content:flex-end">
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <NavItem to="/about"> About </NavItem>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
        </NavbarCollapsible>
    </Navbar>
</template>
