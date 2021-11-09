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
    IButtonSocialColorVariantsExample,
    IButtonStateActiveExample,
    IButtonStateDisabledExample,
    IButtonStateLoadingExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

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

const Template = (args: any) => ({
    components: {
        IButtonBasicExample
    },
    setup: () => ({ args }),
    template: '<IButtonBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
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
export const SocialColorVariants = () => IButtonSocialColorVariantsExample;
export const StateActive = () => IButtonStateActiveExample;
export const StateDisabled = () => IButtonStateDisabledExample;
export const StateLoading = () => IButtonStateLoadingExample;
