import IAlert from '@inkline/inkline/components/Alert';
import IBadge from '@inkline/inkline/components/Badge';
import IBreadcrumb from '@inkline/inkline/components/Breadcrumb';
import IBreadcrumbItem from '@inkline/inkline/components/BreadcrumbItem';
import IButton from '@inkline/inkline/components/Button';
import IButtonGroup from '@inkline/inkline/components/ButtonGroup';
import ICard from '@inkline/inkline/components/Card';
import ICollapsible from '@inkline/inkline/components/Collapsible';
import ICollapsibleItem from '@inkline/inkline/components/CollapsibleItem';
import IColumn from '@inkline/inkline/components/Column';
import IContainer from '@inkline/inkline/components/Container';
import IDropdown from '@inkline/inkline/components/Dropdown';
import IDropdownDivider from '@inkline/inkline/components/DropdownDivider';
import IDropdownItem from '@inkline/inkline/components/DropdownItem';
import IDropdownMenu from '@inkline/inkline/components/DropdownMenu';
import IHeader from '@inkline/inkline/components/Header';
import ILayout from '@inkline/inkline/components/Layout';
import ILayoutAside from '@inkline/inkline/components/LayoutAside';
import ILayoutContent from '@inkline/inkline/components/LayoutContent';
import ILayoutFooter from '@inkline/inkline/components/LayoutFooter';
import ILayoutHeader from '@inkline/inkline/components/LayoutHeader';
import IListGroup from '@inkline/inkline/components/ListGroup';
import IListGroupItem from '@inkline/inkline/components/ListGroupItem';
import IMedia from '@inkline/inkline/components/Media';
import IModal from '@inkline/inkline/components/Modal';
import INav from '@inkline/inkline/components/Nav';
import INavItem from '@inkline/inkline/components/NavItem';
import INavbar from '@inkline/inkline/components/Navbar';
import INavbarBrand from '@inkline/inkline/components/NavbarBrand';
import INavbarItems from '@inkline/inkline/components/NavbarItems';
import IRow from '@inkline/inkline/components/Row';
import IPagination from '@inkline/inkline/components/Pagination';
import IPopover from '@inkline/inkline/components/Popover';
import IProgress from '@inkline/inkline/components/Progress';
import IProgressBar from '@inkline/inkline/components/ProgressBar';
import ITooltip from '@inkline/inkline/components/Tooltip';

import ICheckbox from '@inkline/inkline/components/Checkbox';
import ICheckboxButton from '@inkline/inkline/components/CheckboxButton';
import ICheckboxGroup from '@inkline/inkline/components/CheckboxGroup';
import ICheckboxButtonGroup from '@inkline/inkline/components/CheckboxButtonGroup';
import IInput from '@inkline/inkline/components/Input';
import IForm from '@inkline/inkline/components/Form';
import IFormGroup from '@inkline/inkline/components/FormGroup';
import IFormLabel from '@inkline/inkline/components/FormLabel';
import IInputNumber from '@inkline/inkline/components/InputNumber';
import IRadio from '@inkline/inkline/components/Radio';
import IRadioButton from '@inkline/inkline/components/RadioButton';
import IRadioGroup from '@inkline/inkline/components/RadioGroup';
import IRadioButtonGroup from '@inkline/inkline/components/RadioButtonGroup';
import ISelect from '@inkline/inkline/components/Select';
import ISelectOption from '@inkline/inkline/components/SelectOption';
import ITextarea from '@inkline/inkline/components/Textarea';

import { $isMobile } from '@inkline/inkline/prototypes/isMobile';
import { $form } from '@inkline/inkline/prototypes/form';

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
        IHeader,
        ILayout,
        ILayoutAside,
        ILayoutContent,
        ILayoutFooter,
        ILayoutHeader,
        IListGroup,
        IListGroupItem,
        IMedia,
        IModal,
        INav,
        INavItem,
        INavbar,
        INavbarBrand,
        INavbarItems,
        IRow,
        IPagination,
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
    IHeader,
    ILayout,
    ILayoutAside,
    ILayoutContent,
    ILayoutFooter,
    ILayoutHeader,
    IListGroup,
    IListGroupItem,
    IMedia,
    IModal,
    INav,
    INavItem,
    INavbar,
    INavbarBrand,
    INavbarItems,
    IRow,
    IPagination,
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