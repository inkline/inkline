<template>
    <button type="button" :class="classes" :style="style" @click="onClick">{{ label }}</button>
</template>

<script>
import './button.css';
import { reactive, computed, inject } from 'vue';
import { inject as paperInject } from '@inkline/paper';
import { inklineSymbol } from '@inkline/inkline/plugin';

export default {
    name: 'MyButton',

    props: {
        label: {
            type: String,
            required: true
        },
        primary: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1;
            }
        },
        backgroundColor: {
            type: String
        }
    },

    emits: ['click'],

    setup (props, { emit }) {
        props = reactive(props);

        console.log(inject, paperInject, inject === paperInject)
        console.log('inject', inject('wtf'));
        console.log('paperInject', paperInject('wtf'));

        return {
            classes: computed(() => ({
                'storybook-button': true,
                'storybook-button--primary': props.primary,
                'storybook-button--secondary': !props.primary,
                [`storybook-button--${props.size || 'medium'}`]: true
            })),
            style: computed(() => ({
                backgroundColor: props.backgroundColor
            })),
            onClick () {
                emit('click');
            }
        };
    }
};
</script>
