export default {
    data () {
        const options = [
            { id: 1, label: 'Richard Hendricks' },
            { id: 2, label: 'Bertram Gilfoyle' },
            { id: 3, label: 'Dinesh Chugtai' },
            { id: 4, label: 'Jared Dunn' },
            { id: 5, label: 'Erlich Bachman' }
        ];

        return {
            selected: options[0],
            options
        };
    }
};
