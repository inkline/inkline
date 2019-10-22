<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>
<script>
import { head } from '@helpers/head'
import Sponsor from '@components/Sponsor';
import GithubButton from 'vue-github-button'

export default {
    name: 'IndexView',
    layout: 'Default',
    head: head({
        title: 'Vue.js UI/UX Framework',
        description: 'Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications with a focus on user experience.',
        preserve: {
            description: true
        }
    }),
    components: {
        GithubButton,
        Sponsor
    },
    data() {
        const defaultSponsor = {
            title: 'Become a sponsor',
            url: 'https://www.patreon.com/bePatron?u=18449490',
            placeholder: true
        };

        return {
            sponsors: {
                large: [
                    defaultSponsor,
                    defaultSponsor,
                    {
                        title: 'Inkline - Vue.js UI/UX Framework',
                        image: require('@/static/images/sponsors/large/inkline.png'),
                        url: 'https://inkline.io',
                        default: true
                    },
                    defaultSponsor,
                    defaultSponsor
                ]
            }
        };
    }
};
</script>
