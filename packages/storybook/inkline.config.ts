import { defineConfig, useTheme } from 'inkline';
import { useAlertTheme } from '@inkline/component-alert/theme';
import { useBadgeTheme } from '@inkline/component-badge/theme';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb/theme';
import { useButtonTheme } from '@inkline/component-button/theme';
import { useCardTheme } from '@inkline/component-card/theme';
import { useIconTheme } from '@inkline/component-icon/theme';
import { useLoaderTheme } from '@inkline/component-loader/theme';
import { usePopoverTheme } from '@inkline/component-popover/theme';
import { useToastTheme } from '@inkline/component-toast/theme';
import { useTooltipTheme } from '@inkline/component-tooltip/theme';

export default defineConfig(() => {
    useTheme();
    useAlertTheme();
    useBadgeTheme();
    useBreadcrumbTheme();
    useBreadcrumbItemTheme();
    useButtonTheme();
    useCardTheme();
    useIconTheme();
    useLoaderTheme();
    usePopoverTheme();
    useToastTheme();
    useTooltipTheme();
});
