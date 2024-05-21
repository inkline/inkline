<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IAlertColorVariantsExample } from '@inkline/inkline/components/IAlert/examples';
import { IBadgeColorVariantsExample } from '@inkline/inkline/components/IBadge/examples';
import { IBreadcrumbRoutingExample } from '@inkline/inkline/components/IBreadcrumb/examples';
import {
    IButtonColorVariantsExample,
    IButtonRoutingExample
} from '@inkline/inkline/components/IButton/examples';
import { IButtonGroupNestedExample } from '@inkline/inkline/components/IButtonGroup/examples';
import { ICardColorVariantsExample } from '@inkline/inkline/components/ICard/examples';
import { ICollapsibleBasicExample } from '@inkline/inkline/components/ICollapsible/examples';
import { IDropdownTriggerExample } from '@inkline/inkline/components/IDropdown/examples';
import { IFormValidationBasicExample } from '@inkline/inkline/stories/forms/validation';
import { IHamburgerMenuAnimationExample } from '@inkline/inkline/components/IHamburgerMenu/examples';
import { IHeaderBasicExample } from '@inkline/inkline/components/IHeader/examples';
import { ILayoutContentWithLeftAsideHeaderFooterExample } from '@inkline/inkline/components/ILayout/examples';
import { IListGroupStateActiveExample } from '@inkline/inkline/components/IListGroup/examples';
import { ILoaderTextExample } from '@inkline/inkline/components/ILoader/examples';
import { IMediaNestingExample } from '@inkline/inkline/components/IMedia/examples';
import {
    IModalColorVariantsExample,
    IModalFullscreenExample
} from '@inkline/inkline/components/IModal/examples';
import { INavbarDropdownExample } from '@inkline/inkline/components/INavbar/examples';
import { IPaginationQuickLinksExample } from '@inkline/inkline/components/IPagination/examples';
import {
    IPopoverPlacementExample,
    IPopoverTriggerExample
} from '@inkline/inkline/components/IPopover/examples';
import { IProgressValueExample } from '@inkline/inkline/components/IProgress/examples';
import { ISidebarCollapsePositionExample } from '@inkline/inkline/components/ISidebar/examples';
import { ITableResponsiveExample } from '@inkline/inkline/components/ITable/examples';
import { ITabsAdvancedExample } from '@inkline/inkline/components/ITabs/examples';
import {
    IToastContainerPositionExample,
    IToastContainerVNodeExample
} from '@inkline/inkline/components/IToastContainer/examples';
import {
    ITooltipPlacementExample,
    ITooltipTriggerExample
} from '@inkline/inkline/components/ITooltip/examples';

export default defineComponent({
    name: 'Inkline',
    components: {
        IAlertColorVariantsExample,
        IBadgeColorVariantsExample,
        IBreadcrumbRoutingExample,
        IButtonColorVariantsExample,
        IButtonRoutingExample,
        IButtonGroupNestedExample,
        ICardColorVariantsExample,
        ICollapsibleBasicExample,
        IDropdownTriggerExample,
        IFormValidationBasicExample,
        IHamburgerMenuAnimationExample,
        IHeaderBasicExample,
        ILayoutContentWithLeftAsideHeaderFooterExample,
        IListGroupStateActiveExample,
        ILoaderTextExample,
        IMediaNestingExample,
        IModalColorVariantsExample,
        IModalFullscreenExample,
        INavbarDropdownExample,
        IPaginationQuickLinksExample,
        IPopoverPlacementExample,
        IPopoverTriggerExample,
        IProgressValueExample,
        ISidebarCollapsePositionExample,
        ITableResponsiveExample,
        ITabsAdvancedExample,
        IToastContainerPositionExample,
        IToastContainerVNodeExample,
        ITooltipPlacementExample,
        ITooltipTriggerExample
    },
    setup() {
        return {};
    }
});
</script>
<template>
    <IContainer>
        <IRow>
            <IColumn>
                <h1>Home</h1>
                <p>
                    Example content for a page with a sidebar, a layout typically seen in
                    Documentation pages and Web Application dashboards.
                </p>
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Alert</h2>
                <IAlertColorVariantsExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Badge</h2>
                <IBadgeColorVariantsExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Breadcrumb</h2>
                <IBreadcrumbRoutingExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Button</h2>
                <IButtonColorVariantsExample />
                <IButtonRoutingExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Button Group</h2>
                <IButtonGroupNestedExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Card</h2>
                <ICardColorVariantsExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Collapsible</h2>
                <ICollapsibleBasicExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Dropdown</h2>
                <IDropdownTriggerExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Form</h2>
                <IFormValidationBasicExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Hamburger Menu</h2>
                <IHamburgerMenuAnimationExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Header</h2>
                <IHeaderBasicExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Layout</h2>
                <ILayoutContentWithLeftAsideHeaderFooterExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>List Group</h2>
                <IListGroupStateActiveExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Loader</h2>
                <div style="height: 100px; width: 100px">
                    <ILoaderTextExample />
                </div>
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Media</h2>
                <IMediaNestingExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Modal</h2>
                <IModalColorVariantsExample />
                <IModalFullscreenExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Navbar</h2>
                <INavbarDropdownExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Pagination</h2>
                <IPaginationQuickLinksExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Popover</h2>
                <IPopoverPlacementExample />
                <IPopoverTriggerExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Progress</h2>
                <IProgressValueExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Sidebar</h2>
                <ISidebarCollapsePositionExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Table</h2>
                <ITableResponsiveExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Tabs</h2>
                <ITabsAdvancedExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Toast</h2>
                <IToastContainerVNodeExample />
                <IToastContainerPositionExample />
            </IColumn>
        </IRow>
        <IRow>
            <IColumn>
                <h2>Tooltip</h2>
                <ITooltipPlacementExample />
                <ITooltipTriggerExample />
            </IColumn>
        </IRow>
    </IContainer>
</template>
