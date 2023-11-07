import type { Component } from 'vue';

export const createExampleStory = (component: Component): (() => Component) => {
    const story = () => component;

    story.parameters = {
        controls: { hideNoControlsWarning: true }
    };

    return story;
};
