import { IHeader } from '@inkline/inkline/components/IHeader/index';
import {
    IHeaderBasicExample,
    IHeaderColorVariantsExample,
    IHeaderCoverExample,
    IHeaderFullscreenExample,
    IHeaderSizeVariantsExample
} from '@inkline/inkline/components/IHeader/examples/index';
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
