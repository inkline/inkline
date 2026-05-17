<script>
export default {
    data() {
        return {
            openRelative: false,
            openAbsolute: false,
            openFixed: false
        };
    }
};
</script>

<template>
    <Layout>
        <LayoutHeader>
            <Navbar fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
                <HamburgerMenu v-model="openRelative" animation="arrow-left" />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="openRelative" :collapse="true" collapse-position="relative">
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
                            <h1>Sidebar Collapse Relative</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
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
                <HamburgerMenu v-model="openAbsolute" animation="arrow-left" />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="openAbsolute" :collapse="true" collapse-position="absolute">
                <Nav vertical>
                    <NavItem to="/"> Home </NavItem>
                    <NavItem to="/about"> Contact </NavItem>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Sidebar Collapse Absolute</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
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
                <HamburgerMenu v-model="openFixed" animation="arrow-left" />
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar v-model="openFixed" :collapse="true" collapse-position="fixed">
                <Nav vertical>
                    <NavItem to="/"> Home </NavItem>
                    <NavItem to="/about"> Contact </NavItem>
                    <NavItem to="/contact"> Contact </NavItem>
                </Nav>
            </Sidebar>
            <LayoutContent>
                <Container fluid>
                    <Row>
                        <Column>
                            <h1>Sidebar Collapse Fixed</h1>
                            <p>
                                Example content for a page with a sidebar that collapses on large
                                screens, a layout typically seen in Documentation pages and Web
                                Application dashboards.
                            </p>
                        </Column>
                    </Row>
                </Container>
            </LayoutContent>
        </Layout>
    </Layout>
</template>
