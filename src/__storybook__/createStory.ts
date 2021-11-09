export const createStory = (Component: any) => (args: any) => ({
    components: {
        Component
    },
    setup: () => ({ args }),
    template: '<Component class="storybook-example" v-bind="args" />'
});
