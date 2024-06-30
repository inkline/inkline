<script lang="ts" setup>
import { ref, defineComponent, h, markRaw } from 'vue';

const LabelRenderComponent = markRaw(
    defineComponent({
        props: {
            ctx: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props) {
            return () => h('span', `${props.ctx.address.city}, ${props.ctx.address.country}`);
        }
    })
);

const selected = ref(null);
const options = ref([
    {
        id: 1,
        address: {
            city: 'London',
            country: 'England'
        }
    },
    {
        id: 2,
        address: {
            city: 'New York',
            country: 'United States'
        }
    },
    {
        id: 3,
        address: {
            city: 'Paris',
            country: 'France'
        }
    },
    {
        id: 4,
        address: {
            city: 'Moscow',
            country: 'Russia'
        }
    },
    {
        id: 5,
        address: {
            city: 'Tokyo',
            country: 'Japan'
        }
    },
    {
        id: 6,
        address: {
            city: 'Dubai',
            country: 'United Arab Emirates'
        }
    }
]);
</script>
<template>
    <ISelect
        v-model="selected"
        :options="options"
        :label="LabelRenderComponent"
        placeholder="Choose something.."
    />
</template>
