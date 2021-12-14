import IHeader from '../index.vue';
import IHeaderBasicExample from './basic.vue';
import IHeaderColorVariantsExample from './color-variants.vue';
import IHeaderCoverExample from './cover.vue';
import IHeaderFullscreenExample from './fullscreen.vue';
import IHeaderSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IHeader,
    title: 'Components/Header',
    argTypes: {
        ...colorArgType(['light', 'dark', 'primary']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IHeaderBasicExample);
export const ColorVariants = () => IHeaderColorVariantsExample;
export const Cover = () => IHeaderCoverExample;
export const Fullscreen = () => IHeaderFullscreenExample;
export const SizeVariants = () => IHeaderSizeVariantsExample;
