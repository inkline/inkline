import { IButton } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

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
export const Block = createStory(IButtonBlockExample);
export const Tag = createStory(IButtonTagExample);
export const Type = createStory(IButtonTypeExample);
export const Circle = createStory(IButtonCircleExample);
export const ColorVariants = createStory(IButtonColorVariantsExample);
export const Icon = createStory(IButtonIconExample);
export const Link = createStory(IButtonLinkExample);
export const Outline = createStory(IButtonOutlineExample);
export const Routing = createStory(IButtonRoutingExample);
export const SizeVariants = createStory(IButtonSizeVariantsExample);
export const SocialColorVariants = createStory(IButtonSocialColorVariantsExample);
export const StateActive = createStory(IButtonStateActiveExample);
export const StateDisabled = createStory(IButtonStateDisabledExample);
export const StateLoading = createStory(IButtonStateLoadingExample);
