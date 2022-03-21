import { ILoader } from '@inkline/inkline/components';
import {
    ILoaderBasicExample,
    ILoaderColorVariantsExample,
    ILoaderSizeAutoExample,
    ILoaderSizeVariantsExample,
    ILoaderTextExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ILoader,
    title: 'Components/Loader',
    argTypes: {
        ...colorArgType(['primary', 'light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ILoaderBasicExample);
export const ColorVariants = createStory(ILoaderColorVariantsExample);
export const SizeAuto = createStory(ILoaderSizeAutoExample);
export const SizeVariants = createStory(ILoaderSizeVariantsExample);
export const Text = createStory(ILoaderTextExample);
