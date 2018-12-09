import IAlert from 'inkline/components/Alert';
import IBadge from 'inkline/components/Badge';
import IBreadcrumb from 'inkline/components/Breadcrumb';
import IBreadcrumbItem from 'inkline/components/BreadcrumbItem';
import IButton from 'inkline/components/Button';
import IButtonGroup from 'inkline/components/ButtonGroup';
import ICard from 'inkline/components/Card';
import ICollapsible from 'inkline/components/Collapsible';
import ICollapsibleItem from 'inkline/components/CollapsibleItem';
import IColumn from 'inkline/components/Column';
import IContainer from 'inkline/components/Container';
import IDropdown from 'inkline/components/Dropdown';
import IDropdownDivider from 'inkline/components/DropdownDivider';
import IDropdownItem from 'inkline/components/DropdownItem';
import IDropdownMenu from 'inkline/components/DropdownMenu';
import ILayout from 'inkline/components/Layout';
import ILayoutAside from 'inkline/components/LayoutAside';
import ILayoutContent from 'inkline/components/LayoutContent';
import ILayoutFooter from 'inkline/components/LayoutFooter';
import ILayoutHeader from 'inkline/components/LayoutHeader';
import IModal from 'inkline/components/Modal';
import INav from 'inkline/components/Nav';
import INavItem from 'inkline/components/NavItem';
import INavbar from 'inkline/components/Navbar';
import INavbarBrand from 'inkline/components/NavbarBrand';
import INavbarItems from 'inkline/components/NavbarItems';
import IRow from 'inkline/components/Row';
import IPopover from 'inkline/components/Popover';
import IProgress from 'inkline/components/Progress';
import IProgressBar from 'inkline/components/ProgressBar';
import ITooltip from 'inkline/components/Tooltip';

import ICheckbox from 'inkline/components/Checkbox';
import ICheckboxButton from 'inkline/components/CheckboxButton';
import ICheckboxGroup from 'inkline/components/CheckboxGroup';
import ICheckboxButtonGroup from 'inkline/components/CheckboxButtonGroup';
import IInput from 'inkline/components/Input';
import IForm from 'inkline/components/Form';
import IFormGroup from 'inkline/components/FormGroup';
import IFormLabel from 'inkline/components/FormLabel';
import IInputNumber from 'inkline/components/InputNumber';
import IRadio from 'inkline/components/Radio';
import IRadioButton from 'inkline/components/RadioButton';
import IRadioGroup from 'inkline/components/RadioGroup';
import IRadioButtonGroup from 'inkline/components/RadioButtonGroup';
import ISelect from 'inkline/components/Select';
import ISelectOption from 'inkline/components/SelectOption';
import ITextarea from 'inkline/components/Textarea';

import { $isMobile } from 'inkline/prototypes/isMobile';
import { $form } from 'inkline/prototypes/form';

class Inkline {
    static components = [
        IAlert,
        IBadge,
        IBreadcrumb,
        IBreadcrumbItem,
        IButton,
        IButtonGroup,
        ICard,
        ICollapsible,
        ICollapsibleItem,
        IColumn,
        IContainer,
        IDropdown,
        IDropdownDivider,
        IDropdownItem,
        IDropdownMenu,
        ILayout,
        ILayoutAside,
        ILayoutContent,
        ILayoutFooter,
        ILayoutHeader,
        IModal,
        INav,
        INavItem,
        INavbar,
        INavbarBrand,
        INavbarItems,
        IRow,
        IPopover,
        IProgress,
        IProgressBar,
        ITooltip,

        ICheckbox,
        ICheckboxButton,
        ICheckboxGroup,
        ICheckboxButtonGroup,
        IInput,
        IForm,
        IFormGroup,
        IFormLabel,
        IInputNumber,
        IRadio,
        IRadioButton,
        IRadioGroup,
        IRadioButtonGroup,
        ISelect,
        ISelectOption,
        ITextarea
    ];

    constructor () {
        if (typeof window !== 'undefined' && window.Vue) {
            this.install(window.Vue);
        }
    }

    static install (Vue) {
        this.components.map(component => {
            Vue.component(component.name, component);
        });

        Vue.prototype.$isMobile = $isMobile();
        Vue.prototype.$form = $form;
    }
}

export {
    IAlert,
    IBadge,
    IBreadcrumb,
    IBreadcrumbItem,
    IButton,
    IButtonGroup,
    ICard,
    ICollapsible,
    ICollapsibleItem,
    IColumn,
    IContainer,
    IDropdown,
    IDropdownDivider,
    IDropdownItem,
    IDropdownMenu,
    ILayout,
    ILayoutAside,
    ILayoutContent,
    ILayoutFooter,
    ILayoutHeader,
    IModal,
    INav,
    INavItem,
    INavbar,
    INavbarBrand,
    INavbarItems,
    IRow,
    IPopover,
    IProgress,
    IProgressBar,
    ITooltip,

    ICheckbox,
    ICheckboxButton,
    ICheckboxGroup,
    ICheckboxButtonGroup,
    IInput,
    IForm,
    IFormGroup,
    IFormLabel,
    IInputNumber,
    IRadio,
    IRadioButton,
    IRadioGroup,
    IRadioButtonGroup,
    ISelect,
    ISelectOption,
    ITextarea,

    Inkline
};

export default Inkline;