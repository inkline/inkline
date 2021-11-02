import IMedia from './index.vue';
import {
    IMediaAlignmentExample,
    IMediaBasicExample,
    IMediaNestingExample
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IMedia,
    title: 'Components/Media',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-media v-bind="args">
        Media
    </i-media>`,
});

export const Component = Template.bind({});

export const Alignment = () => IMediaAlignmentExample;
export const Basic = () => IMediaBasicExample;
export const Nesting = () => IMediaNestingExample;
            