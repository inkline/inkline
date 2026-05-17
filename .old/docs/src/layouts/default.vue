<template>
    <main id="default-layout">
        <AppNavbar />
        <AppContent>
            <slot />
        </AppContent>
    </main>
</template>

<style>
#docs-layout {
    padding-top: calc(var(--spacing) * 4);

    .app-navbar {
        position: fixed;
        top: 0;
        left: 0;
    }
}
</style>
