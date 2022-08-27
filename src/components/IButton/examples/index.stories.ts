import IButton from '../index.vue';
import {
    IButtonBasicExample,
    IButtonBlockExample,
    IButtonTagExample,
    IButtonTypeExample,
    IButtonCircleExample,
    IButtonColorVariantsExample,
    IButtonIconExample,
    IButtonLinkExample,
    IButtonOutlineExample,
    IButtonRoutingExample,
    IButtonSizeVariantsExample,
    IButtonStateActiveExample,
    IButtonStateDisabledExample,
    IButtonStateLoadingExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IButton,
    title: 'Components/Button',
    argTypes: {
        ...colorArgType([
            'primary',
            'secondary',
            'light',
            'dark',
            'info',
            'success',
            'warning',
            'danger',
            'facebook',
            'google',
            'twitter',
            'github'
        ]),
        ...sizeArgType()
    }
};

export const Basic = createStory(IButtonBasicExample);
export const Block = () => IButtonBlockExample;
export const Tag = () => IButtonTagExample;
export const Type = () => IButtonTypeExample;
export const Circle = () => IButtonCircleExample;
export const ColorVariants = () => IButtonColorVariantsExample;
export const Icon = () => IButtonIconExample;
export const Link = () => IButtonLinkExample;
export const Outline = () => IButtonOutlineExample;
export const Routing = () => IButtonRoutingExample;
export const SizeVariants = () => IButtonSizeVariantsExample;
export const StateActive = () => IButtonStateActiveExample;
export const StateDisabled = () => IButtonStateDisabledExample;
export const StateLoading = () => IButtonStateLoadingExample;
