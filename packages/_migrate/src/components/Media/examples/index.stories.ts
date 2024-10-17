import { Media } from '@inkline/inkline/components/Media/index';
import {
    MediaAlignmentExample,
    MediaBasicExample,
    MediaNestingExample
} from '@inkline/inkline/components/Media/examples/index';
import { createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Media,
    title: 'Components/Media',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(MediaBasicExample);
export const Alignment = () => MediaAlignmentExample;
export const Nesting = () => MediaNestingExample;
