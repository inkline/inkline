import {
    VerticalAlignBasicExample,
    VerticalAlignTableExample
} from '@inkline/inkline/stories/utilities/vertical-align/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Vertical Align'
};

export const Basic = createStory(VerticalAlignBasicExample);
export const Table = createStory(VerticalAlignTableExample);
