import { DisplayBlockExample, DisplayInlineExample } from '@inkline/inkline/stories/utilities/display/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Display'
};

export const Block = createStory(DisplayBlockExample);
export const Inline = createStory(DisplayInlineExample);
