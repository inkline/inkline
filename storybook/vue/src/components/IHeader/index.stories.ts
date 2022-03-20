import { IHeader } from '@inkline/inkline/components';
import {
    IHeaderBasicExample,
    IHeaderColorVariantsExample,
    IHeaderCoverExample,
    IHeaderFullscreenExample,
    IHeaderSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IHeader,
    title: 'Components/Header',
    argTypes: {
        ...colorArgType(['light', 'dark', 'primary']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IHeaderBasicExample);
export const ColorVariants = createStory(IHeaderColorVariantsExample);
export const Cover = createStory(IHeaderCoverExample);
export const Fullscreen = createStory(IHeaderFullscreenExample);
export const SizeVariants = createStory(IHeaderSizeVariantsExample);
