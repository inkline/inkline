import { useAlertTheme } from '@inkline/component-alert';
import { useBadgeTheme } from '@inkline/component-badge';
import { useBreadcrumbTheme } from '@inkline/component-breadcrumb';
import { useButtonTheme } from '@inkline/component-button';
import { useLoaderTheme } from '@inkline/component-loader';

export function useThemeComponents() {
    useAlertTheme();
    useBadgeTheme();
    useBreadcrumbTheme();
    useButtonTheme();
    // useBadgeTheme();
    // useBreadcrumbTheme();
    // useBreadcrumbItemTheme();
    // useButtonTheme();
    // useButtonGroupTheme();
    // useCardTheme();
    useLoaderTheme();
}
