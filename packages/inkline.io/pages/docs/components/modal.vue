<template lang="md" src="./modal.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ModalView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Modal',
        description: 'Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.'
    }),
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
