import IButton from '../index.vue';
import {
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
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IButton,
    title: 'Components/Button',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-button v-bind="args">
        Button
    </i-button>`,
});

export const Component = Template.bind({});

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
            