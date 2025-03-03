<template>
    <main id="docs-layout">
        <AppNavbar />
        <AppContent container>
            <Grid sm="3">
                <AppSidebar />
            </Grid>
            <Grid sm="9">
                <AppArticle>
                    <slot />
                </AppArticle>
            </Grid>
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
        border-bottom: var(--border-bottom);
    }

    .app-content {
        width: 100%;

        .app-sidebar {
            padding: var(--spacing);
        }

        .app-article > article {
            padding: var(--spacing);
        }
    }
}
</style>
<script setup lang="ts"></script>
