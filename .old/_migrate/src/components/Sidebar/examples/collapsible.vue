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
            <Sidebar v-model="open">
                <Nav vertical>
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
                            <h1>Sidebar</h1>
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
