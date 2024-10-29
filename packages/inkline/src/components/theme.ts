import { useAlertTheme } from '@inkline/component-alert';
import { useBadgeTheme } from '@inkline/component-badge';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb';
import { useButtonTheme } from '@inkline/component-button';
import { useButtonGroupTheme } from '@inkline/component-button-group';
import { useCardTheme } from '@inkline/component-card';
import { useIconTheme } from '@inkline/component-icon';
import { useLoaderTheme } from '@inkline/component-loader';
import { usePopoverTheme } from '@inkline/component-popover';
import { useToastTheme } from '@inkline/component-toast';
import { useTooltipTheme } from '@inkline/component-tooltip';

export function useComponentsTheme() {
    useAlertTheme();
    useBadgeTheme();
    useBreadcrumbTheme();
    useButtonTheme();
    useBreadcrumbItemTheme();
    useButtonTheme();
    useButtonGroupTheme();
    useCardTheme();
    useIconTheme();
    useLoaderTheme();
    usePopoverTheme();
    useToastTheme();
    useTooltipTheme();
}
