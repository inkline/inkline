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
            <Navbar color="light" fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
                <HamburgerMenu
                    v-model="open"
                    color="light"
                    animation="arrow-left"
                    class="_lg:hidden"
                />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="open" color="light">
                <Nav vertical color="light">
                    <NavItem to="/"> Home </NavItem>
                    <Collapsible color="transparent">
                        <CollapsibleItem title="Menu">
                            <NavItem to="/1"> Item 1 </NavItem>
                            <NavItem to="/2"> Item 2 </NavItem>
                            <NavItem to="/3"> Item 3 </NavItem>
                        </CollapsibleItem>
                    </Collapsible>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Light Sidebar</h1>
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
            <Navbar color="dark" fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
                <HamburgerMenu
                    v-model="open"
                    color="dark"
                    animation="arrow-left"
                    class="_lg:hidden"
                />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="open" color="dark">
                <Nav vertical color="dark">
                    <NavItem to="/"> Home </NavItem>
                    <Collapsible color="transparent">
                        <CollapsibleItem title="Menu">
                            <NavItem to="/about"> Item 1 </NavItem>
                            <NavItem to="/about"> Item 2 </NavItem>
                            <NavItem to="/about"> Item 3 </NavItem>
                        </CollapsibleItem>
                    </Collapsible>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Dark Sidebar</h1>
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
</template>
