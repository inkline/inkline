import { ref, selector } from '@inkline/config';
import { useBreadcrumbThemeVariables } from '@inkline/inkline/components/IBreadcrumb/theme';

export function useBreadcrumbItemThemeLayout() {
    const { breadcrumbSeparator } = useBreadcrumbThemeVariables();

    selector('.breadcrumb-item', {
        marginBottom: 0
    });

    selector('.breadcrumb-item:first-of-type', {
        paddingLeft: 0
    });

    selector('.breadcrumb-item > span', {
        display: 'inline-block'
    });

    selector('.breadcrumb-item + .breadcrumb-item::before', {
        display: 'inline-block',
        content: ref(breadcrumbSeparator)
    });
}

export function useBreadcrumbItemThemeBase() {
    const { breadcrumbPaddingLeft, breadcrumbPaddingRight, breadcrumbActiveColor } =
        useBreadcrumbThemeVariables();

    selector('.breadcrumb-item', {
        paddingLeft: ref(breadcrumbPaddingLeft)
    });

    selector('.breadcrumb-item + .breadcrumb-item::before', {
        paddingRight: ref(breadcrumbPaddingRight)
    });

    selector('.breadcrumb-item.-active, .breadcrumb-item.-active a', {
        color: ref(breadcrumbActiveColor)
    });
}

export function useBreadcrumbItemTheme() {
    useBreadcrumbItemThemeLayout();
    useBreadcrumbItemThemeBase();
}
