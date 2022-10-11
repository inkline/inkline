import IButton from '../IButton.vue';
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
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

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
export const Block = createExampleStory(IButtonBlockExample);
export const Tag = createExampleStory(IButtonTagExample);
export const Type = createExampleStory(IButtonTypeExample);
export const Circle = createExampleStory(IButtonCircleExample);
export const ColorVariants = createExampleStory(IButtonColorVariantsExample);
export const Icon = createExampleStory(IButtonIconExample);
export const Link = createExampleStory(IButtonLinkExample);
export const Outline = createExampleStory(IButtonOutlineExample);
export const Routing = createExampleStory(IButtonRoutingExample);
export const SizeVariants = createExampleStory(IButtonSizeVariantsExample);
export const StateActive = createExampleStory(IButtonStateActiveExample);
export const StateDisabled = createExampleStory(IButtonStateDisabledExample);
export const StateLoading = createExampleStory(IButtonStateLoadingExample);
