<template>
    <NavItem to="/" class="app-navbar-brand">
        <Grid justify-content="center" align-items="center" no-gap>
            <AppLogo />
            <Typography font-weight="semibold">Inkline</Typography>
        </Grid>
    </NavItem>
</template>

<style>
.app-navbar-brand {
    margin-right: auto;

    .app-logo {
        margin-right: var(--spacing-xs);
    }

    &:hover {
        color: inherit;
    }
}
</style>
