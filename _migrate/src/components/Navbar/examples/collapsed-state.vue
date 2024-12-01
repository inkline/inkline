<script>
export default {
    data() {
        return {
            open: false
        };
    }
};
</script>
<template>
    <Button @click="open = !open">Toggle Navbar</Button>

    <Navbar v-model="open" :collapse="true" :collapse-on-click-outside="false">
        <NavbarBrand to="/"> Navbar </NavbarBrand>
        <NavbarCollapsible>
            <Nav>
                <NavItem to="/"> Home </NavItem>
                <NavItem to="/about"> About </NavItem>
                <NavItem to="/contact"> Contact </NavItem>
            </Nav>
        </NavbarCollapsible>
    </Navbar>
</template>
