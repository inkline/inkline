import IButton from '../index.vue';
import IButtonBasicExample from './basic.vue';
import IButtonBlockExample from './block.vue';
import IButtonTagExample from './button-tag.vue';
import IButtonTypeExample from './button-type.vue';
import IButtonCircleExample from './circle.vue';
import IButtonColorVariantsExample from './color-variants.vue';
import IButtonIconExample from './icon.vue';
import IButtonLinkExample from './link.vue';
import IButtonOutlineExample from './outline.vue';
import IButtonRoutingExample from './routing.vue';
import IButtonSizeVariantsExample from './size-variants.vue';
import IButtonSocialColorVariantsExample from './social-color-variants.vue';
import IButtonStateActiveExample from './state-active.vue';
import IButtonStateDisabledExample from './state-disabled.vue';
import IButtonStateLoadingExample from './state-loading.vue';
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
export const SocialColorVariants = () => IButtonSocialColorVariantsExample;
export const StateActive = () => IButtonStateActiveExample;
export const StateDisabled = () => IButtonStateDisabledExample;
export const StateLoading = () => IButtonStateLoadingExample;
