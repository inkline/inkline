import { Header } from '@inkline/inkline/components/Header/index';
import {
    HeaderBasicExample,
    HeaderColorVariantsExample,
    HeaderCoverExample,
    HeaderFullscreenExample,
    HeaderSizeVariantsExample
} from '@inkline/inkline/components/Header/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Header,
    title: 'Components/Header',
    argTypes: {
        ...colorArgType(['light', 'dark', 'primary']),
        ...sizeArgType()
    }
};

export const Basic = createStory(HeaderBasicExample);
export const ColorVariants = () => HeaderColorVariantsExample;
export const Cover = () => HeaderCoverExample;
export const Fullscreen = () => HeaderFullscreenExample;
export const SizeVariants = () => HeaderSizeVariantsExample;
