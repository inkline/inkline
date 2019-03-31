<template lang="md" src="./modal.md" />
<script>
import View from '@components/View';
import { IButton, IModal } from '@inkline/inkline';

export default {
    name: 'ModalView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Modal'
    },
    components: {
        IButton,
        IModal,
    },
    data () {
        return {
            showModal: false,
            showModalSm: false,
            showModalMd: false,
            showModalLg: false,
            showModalPrimary: false,
            showModalSecondary: false,
            showModalLight: false,
            showModalDark: false,
            showModalSuccess: false,
            showModalWarning: false,
            showModalDanger: false,
            showModalInfo: false
        };
    }
};
</script>
