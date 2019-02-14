import View from '@components/View';
import { IButton, IDropdown, IDropdownDivider, IDropdownItem, IDropdownMenu } from '@inkline/inkline';

export default {
    name: 'DropdownView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Dropdown'
    },
    components: {
        IButton,
        IDropdown,
        IDropdownDivider,
        IDropdownItem,
        IDropdownMenu
    }
};
