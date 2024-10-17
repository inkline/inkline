import { defineConfig } from '@inkline/config';
import { useTheme } from '@inkline/theme';
import { useAlertTheme } from '@inkline/component-alert/theme';
import { useBadgeTheme } from '@inkline/component-badge/theme';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb/theme';
import { useButtonTheme } from '@inkline/component-button/theme';
import { useLoaderTheme } from '@inkline/component-loader/theme';

export default defineConfig(() => {
    useTheme();
    useAlertTheme();
    useBadgeTheme();
    useBreadcrumbTheme();
    useBreadcrumbItemTheme();
    useButtonTheme();
    useLoaderTheme();
});
