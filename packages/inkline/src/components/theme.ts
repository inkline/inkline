import { useAlertTheme } from '@inkline/component-alert';
import { useBadgeTheme } from '@inkline/component-badge';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb';
import { useButtonTheme } from '@inkline/component-button';
import { useButtonGroupTheme } from '@inkline/component-button-group';
import { useCardTheme } from '@inkline/component-card';
import { useFormGroupTheme } from '@inkline/component-form-group';
import { useIconTheme } from '@inkline/component-icon';
import { useInputTheme } from '@inkline/component-input';
import { useLoaderTheme } from '@inkline/component-loader';
import { useModalTheme, useModalContainerTheme } from '@inkline/component-modal';
import { usePopoverTheme } from '@inkline/component-popover';
import { useToastTheme, useToastContainerTheme } from '@inkline/component-toast';
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
    useFormGroupTheme();
    useIconTheme();
    useInputTheme();
    useLoaderTheme();
    useModalTheme();
    useModalContainerTheme();
    usePopoverTheme();
    useToastTheme();
    useToastContainerTheme();
    useTooltipTheme();
}
