import '@inkline/inkline/src/index.styl';

import IAlert from '@inkline/inkline/src/components/Alert';
import IBadge from '@inkline/inkline/src/components/Badge';
import IBreadcrumb from '@inkline/inkline/src/components/Breadcrumb';
import IBreadcrumbItem from '@inkline/inkline/src/components/BreadcrumbItem';
import IButton from '@inkline/inkline/src/components/Button';
import IButtonGroup from '@inkline/inkline/src/components/ButtonGroup';
import ICard from '@inkline/inkline/src/components/Card';
import ICollapsible from '@inkline/inkline/src/components/Collapsible';
import ICollapsibleItem from '@inkline/inkline/src/components/CollapsibleItem';
import IColumn from '@inkline/inkline/src/components/Column';
import IContainer from '@inkline/inkline/src/components/Container';
import IDropdown from '@inkline/inkline/src/components/Dropdown';
import IDropdownDivider from '@inkline/inkline/src/components/DropdownDivider';
import IDropdownItem from '@inkline/inkline/src/components/DropdownItem';
import IDropdownMenu from '@inkline/inkline/src/components/DropdownMenu';
import IHeader from '@inkline/inkline/src/components/Header';
import ILayout from '@inkline/inkline/src/components/Layout';
import ILayoutAside from '@inkline/inkline/src/components/LayoutAside';
import ILayoutContent from '@inkline/inkline/src/components/LayoutContent';
import ILayoutFooter from '@inkline/inkline/src/components/LayoutFooter';
import ILayoutHeader from '@inkline/inkline/src/components/LayoutHeader';
import IListGroup from '@inkline/inkline/src/components/ListGroup';
import IListGroupItem from '@inkline/inkline/src/components/ListGroupItem';
import IMedia from '@inkline/inkline/src/components/Media';
import IModal from '@inkline/inkline/src/components/Modal';
import INav from '@inkline/inkline/src/components/Nav';
import INavItem from '@inkline/inkline/src/components/NavItem';
import INavbar from '@inkline/inkline/src/components/Navbar';
import INavbarBrand from '@inkline/inkline/src/components/NavbarBrand';
import INavbarItems from '@inkline/inkline/src/components/NavbarItems';
import IRow from '@inkline/inkline/src/components/Row';
import IPagination from '@inkline/inkline/src/components/Pagination';
import IPopover from '@inkline/inkline/src/components/Popover';
import IProgress from '@inkline/inkline/src/components/Progress';
import IProgressBar from '@inkline/inkline/src/components/ProgressBar';
import ITable from '@inkline/inkline/src/components/Table';
import ITooltip from '@inkline/inkline/src/components/Tooltip';

import ICheckbox from '@inkline/inkline/src/components/Checkbox';
import ICheckboxButton from '@inkline/inkline/src/components/CheckboxButton';
import ICheckboxGroup from '@inkline/inkline/src/components/CheckboxGroup';
import ICheckboxButtonGroup from '@inkline/inkline/src/components/CheckboxButtonGroup';
import IInput from '@inkline/inkline/src/components/Input';
import IForm from '@inkline/inkline/src/components/Form';
import IFormGroup from '@inkline/inkline/src/components/FormGroup';
import IFormLabel from '@inkline/inkline/src/components/FormLabel';
import IInputNumber from '@inkline/inkline/src/components/InputNumber';
import IRadio from '@inkline/inkline/src/components/Radio';
import IRadioButton from '@inkline/inkline/src/components/RadioButton';
import IRadioGroup from '@inkline/inkline/src/components/RadioGroup';
import IRadioButtonGroup from '@inkline/inkline/src/components/RadioButtonGroup';
import ISelect from '@inkline/inkline/src/components/Select';
import ISelectOption from '@inkline/inkline/src/components/SelectOption';
import ITextarea from '@inkline/inkline/src/components/Textarea';

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
        ITable,
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

    static install (Vue) {
        this.components.map(component => {
            Vue.component(component.name, component);
        });
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Inkline);
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
    ITable,
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