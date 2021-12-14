import ILoader from '../index.vue';
import ILoaderBasicExample from './basic.vue';
import ILoaderColorVariantsExample from './color-variants.vue';
import ILoaderSizeAutoExample from './size-auto.vue';
import ILoaderSizeVariantsExample from './size-variants.vue';
import ILoaderTextExample from './text.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ILoader,
    title: 'Components/Loader',
    argTypes: {
        ...colorArgType(['primary', 'light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ILoaderBasicExample);
export const ColorVariants = () => ILoaderColorVariantsExample;
export const SizeAuto = () => ILoaderSizeAutoExample;
export const SizeVariants = () => ILoaderSizeVariantsExample;
export const Text = () => ILoaderTextExample;
