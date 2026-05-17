<template>
    <main id="docs-layout">
        <AppNavbar />
        <AppContent container>
            <Grid md="3" sm="4">
                <AppSidebar />
            </Grid>
            <Grid md="9" sm="8">
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
        z-index: 100;
        top: 0;
        left: 0;
        border-bottom: var(--border-bottom);
    }

    .app-content {
        width: 100%;

        .app-sidebar {
            --sidebar--padding-top: var(--spacing-xl);
            --sidebar--padding-bottom: var(--spacing-xl);

            position: fixed;
            max-height: calc(
                100% - var(--navbar--height) - var(--sidebar--padding-top) -
                    var(--sidebar--padding-bottom)
            );
            overflow: auto;
            padding: var(--sidebar--padding-top) var(--spacing) var(--sidebar--padding-bottom);
        }

        .app-sidebar-categories {
            margin-bottom: var(--spacing-xl);
        }

        .app-article > article {
            padding: var(--spacing-xl) var(--spacing);
        }
    }
}
</style>
<script setup lang="ts"></script>
