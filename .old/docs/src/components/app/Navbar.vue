<template>
    <header class="app-navbar">
        <Grid container>
            <Nav>
                <AppNavbarBrand />
                <NavItem to="/docs/introduction">Docs</NavItem>
                <NavItem href="https://github.com/inkline/inkline" target="_blank">
                    <Grid>
                        <AppIcon size="24" name="uil:github" />
                    </Grid>
                </NavItem>
            </Nav>
        </Grid>
    </header>
</template>

<style>
.app-navbar {
    width: 100%;
    background: var(--color-white);

    .nav {
        flex-grow: 1;
        margin: var(--spacing);
    }

    .app-navbar-brand {
        margin-right: auto;
    }
}
</style>
