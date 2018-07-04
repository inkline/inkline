import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Column from './components/Column';
import Container from './components/Container';
import Layout from './components/Layout';
import LayoutAside from './components/LayoutAside';
import LayoutContent from './components/LayoutContent';
import LayoutFooter from './components/LayoutFooter';
import LayoutHeader from './components/LayoutHeader';
import Row from './components/Row';

import Checkbox from './components/Checkbox';
import CheckboxButton from './components/CheckboxButton';
import CheckboxGroup from './components/CheckboxGroup';
import Input from './components/Input';
import InputGroup from './components/InputGroup';
import InputNumber from './components/InputNumber';
import Radio from './components/Radio';
import RadioButton from './components/RadioButton';
import RadioGroup from './components/RadioGroup';
import Textarea from './components/Textarea';

const components = {
    Button,
    ButtonGroup,
    Column,
    Container,
    Layout,
    LayoutAside,
    LayoutContent,
    LayoutFooter,
    LayoutHeader,
    Row,

    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Input,
    InputGroup,
    InputNumber,
    Radio,
    RadioButton,
    RadioGroup,
    Textarea
};

class Inkline {
    constructor () {
        if (typeof window !== 'undefined' && window.Vue) {
            this.install(window.Vue);
        }
    }

    install (Vue, opts = {}) {
        components.map(component => {
            Vue.component(component.name, component);
        });
    };
}

export {
    Button as IButton,
    ButtonGroup as IButtonGroup,
    Column as IColumn,
    Container as IContainer,
    Layout as ILayout,
    LayoutAside as ILayoutAside,
    LayoutContent as ILayoutContent,
    LayoutFooter as ILayoutFooter,
    LayoutHeader as ILayoutHeader,
    Row as IRow,

    Checkbox as ICheckbox,
    CheckboxButton as ICheckboxButton,
    CheckboxGroup as ICheckboxGroup,
    Input as IInput,
    InputGroup as IInputGroup,
    InputNumber as IInputNumber,
    Radio as IRadio,
    RadioButton as IRadioButton,
    RadioGroup as IRadioGroup,
    Textarea as ITextarea,
    Inkline
};

export default Inkline;
