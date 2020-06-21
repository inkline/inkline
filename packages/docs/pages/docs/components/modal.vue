<template lang="md" src="./modal.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'ModalView',
    extends: View,
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
