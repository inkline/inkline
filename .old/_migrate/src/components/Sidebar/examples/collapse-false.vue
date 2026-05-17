<template>
    <Layout>
        <LayoutHeader>
            <Navbar fluid :collapse="false">
                <NavbarBrand to="/"> Dashboard </NavbarBrand>
            </Navbar>
        </LayoutHeader>
        <Layout vertical class="_padding-top:1/2">
            <Sidebar :collapse="false">
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
                            <h1>Sidebar</h1>
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
