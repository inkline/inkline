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
    <Layout>
        <LayoutHeader>
            <Navbar fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
                <HamburgerMenu v-model="open" animation="arrow-left" class="_lg:hidden" />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="open" placement="left">
                <Nav vertical>
                    <NavItem to="/"> Home </NavItem>
                    <NavItem to="/about"> About </NavItem>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Left Sidebar</h1>
                            <p>
                                Example content for a page with a sidebar, a layout typically seen
                                in Documentation pages and Web Application dashboards.
                            </p>
                        </Column>
                    </Row>
                </Container>
            </LayoutContent>
        </Layout>
    </Layout>

    <Layout>
        <LayoutHeader>
            <Navbar fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
                <HamburgerMenu v-model="open" animation="arrow-left" class="_lg:hidden" />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Left Sidebar</h1>
                            <p>
                                Example content for a page with a sidebar, a layout typically seen
                                in Documentation pages and Web Application dashboards.
                            </p>
                        </Column>
                    </Row>
                </Container>
            </LayoutContent>
            <Sidebar v-model="open" placement="right">
                <Nav vertical>
                    <NavItem to="/"> Home </NavItem>
                    <NavItem to="/about"> About </NavItem>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
        </Layout>
    </Layout>
</template>
