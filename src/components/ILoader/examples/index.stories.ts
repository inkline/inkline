import { ILoader } from '../index';
import {
    ILoaderBasicExample,
    ILoaderColorVariantsExample,
    ILoaderSizeAutoExample,
    ILoaderSizeVariantsExample,
    ILoaderTextExample
} from './index';
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
