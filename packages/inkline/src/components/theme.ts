import { useAlertTheme } from '@inkline/component-alert';
import { useBadgeTheme } from '@inkline/component-badge';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb';
import { useButtonTheme } from '@inkline/component-button';
import { useButtonGroupTheme } from '@inkline/component-button-group';
import { useCardTheme } from '@inkline/component-card';
import { useCheckboxTheme, useCheckboxGroupTheme } from '@inkline/component-checkbox';
import { useFormGroupTheme } from '@inkline/component-form-group';
import { useIconTheme } from '@inkline/component-icon';
import { useInputTheme } from '@inkline/component-input';
import { useLoaderTheme } from '@inkline/component-loader';
import { useMediaTheme } from '@inkline/component-media';
import { useModalTheme, useModalContainerTheme } from '@inkline/component-modal';
import { usePopoverTheme } from '@inkline/component-popover';
import { useRadioTheme, useRadioGroupTheme } from '@inkline/component-radio';
import { useTextareaTheme } from '@inkline/component-textarea';
import { useToastTheme, useToastContainerTheme } from '@inkline/component-toast';
import { useToggleTheme } from '@inkline/component-toggle';
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
    useCheckboxTheme();
    useCheckboxGroupTheme();
    useFormGroupTheme();
    useIconTheme();
    useInputTheme();
    useLoaderTheme();
    useMediaTheme();
    useModalTheme();
    useModalContainerTheme();
    usePopoverTheme();
    useRadioTheme();
    useRadioGroupTheme();
    useTextareaTheme();
    useToastTheme();
    useToastContainerTheme();
    useToggleTheme();
    useTooltipTheme();
}
