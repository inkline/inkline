import IMedia from '../index.vue';
import {
    IMediaAlignmentExample,
    IMediaBasicExample,
    IMediaNestingExample
} from './index';
import { sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IMedia,
    title: 'Components/Media',
    argTypes: {
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IMediaBasicExample
    },
    setup: () => ({ args }),
    template: '<IMediaBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const Alignment = () => IMediaAlignmentExample;
export const Nesting = () => IMediaNestingExample;
