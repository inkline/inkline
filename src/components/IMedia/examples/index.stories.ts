import IMedia from '../index.vue';
import {
    IMediaAlignmentExample,
    IMediaBasicExample,
    IMediaNestingExample
} from './index';
import { createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IMedia,
    title: 'Components/Media',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(IMediaBasicExample);
export const Alignment = () => IMediaAlignmentExample;
export const Nesting = () => IMediaNestingExample;
