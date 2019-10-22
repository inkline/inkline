import GridBox from '@components/docs/GridBox';

export default {
    name: 'ColorBox',
    extends: GridBox,
    props: {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }
};
