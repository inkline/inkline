import { StoryFn } from '@storybook/vue3';
import { ConcreteComponent } from 'vue';

export const createExampleStory = (component: ConcreteComponent): StoryFn<ConcreteComponent> => {
    const story: StoryFn<typeof component> = () => component;
    story.parameters = {
        controls: { disable: true }
    };
    return story;
};
