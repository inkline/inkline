import { VerticalAlignBasicExample, VerticalAlignTableExample } from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Vertical Align'
};

export const Basic = createStory(VerticalAlignBasicExample);
export const Table = createStory(VerticalAlignTableExample);
