import { IMedia } from '@inkline/inkline/components';
import {
    IMediaAlignmentExample,
    IMediaBasicExample,
    IMediaNestingExample
} from './index';
import {  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IMedia,
    title: 'Components/Media',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(IMediaBasicExample);
export const Alignment = createStory(IMediaAlignmentExample);
export const Nesting = createStory(IMediaNestingExample);
