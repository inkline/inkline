import { defineConfig, useTheme } from 'inkline';
import { useAlertTheme } from '@inkline/component-alert/theme';
import { useBadgeTheme } from '@inkline/component-badge/theme';
import { useBreadcrumbTheme, useBreadcrumbItemTheme } from '@inkline/component-breadcrumb/theme';
import { useButtonTheme } from '@inkline/component-button/theme';
import { useButtonGroupTheme } from '@inkline/component-button-group/theme';
import { useCardTheme } from '@inkline/component-card/theme';
import { useCheckboxTheme, useCheckboxGroupTheme } from '@inkline/component-checkbox/theme';
import { useFormGroupTheme } from '@inkline/component-form-group/theme';
import { useIconTheme } from '@inkline/component-icon/theme';
import { useInputTheme } from '@inkline/component-input/theme';
import { useLoaderTheme } from '@inkline/component-loader/theme';
import { useMediaTheme } from '@inkline/component-media/theme';
import { useModalTheme, useModalContainerTheme } from '@inkline/component-modal/theme';
import { usePopoverTheme } from '@inkline/component-popover/theme';
import { useRadioTheme, useRadioGroupTheme } from '@inkline/component-radio/theme';
import { useTextareaTheme } from '@inkline/component-textarea/theme';
import { useToastTheme, useToastContainerTheme } from '@inkline/component-toast/theme';
import { useToggleTheme } from '@inkline/component-toggle/theme';
import { useTooltipTheme } from '@inkline/component-tooltip/theme';

export default defineConfig(() => {
    useTheme();
    useAlertTheme();
    useBadgeTheme();
    useBreadcrumbTheme();
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
});
