import { IProgress, IProgressBar } from "@inkline/inkline/src/components/index";

export default {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    components: {
        IProgress,
        IProgressBar
    }
};
