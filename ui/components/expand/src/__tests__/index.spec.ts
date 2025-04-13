import { Expand } from '../index';
import { defineComponent, h } from 'vue';
import { render } from '@testing-library/vue';

const TestComponent = defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return () =>
            h(Expand, {}, () =>
                h('button', {
                    style: {
                        display: props.visible ? 'block' : 'none',
                        height: '100px',
                        width: '100px'
                    }
                })
            );
    }
});

describe('transitions', () => {
    describe('Expand', () => {
        describe('methods', () => {
            describe('onEnter()', () => {
                it('should set element width, position, visibility, and height', async () => {
                    const wrapper = render(TestComponent, {});
                    await wrapper.rerender({ visible: true });
                    const element = wrapper.container.querySelector('button')!;

                    expect(element.style.width).toEqual('100px');
                    expect(element.style.height).toEqual('100px');
                    expect(element.style.display).toEqual('block');
                    expect(element.style.position).toEqual('');
                    expect(element.style.visibility).toEqual('');
                });
            });

            describe('onLeave()', () => {
                it('should set height before timeout', async () => {
                    const wrapper = render(TestComponent, {
                        props: {
                            visible: true
                        }
                    });
                    await wrapper.rerender({ visible: false });
                    const element = wrapper.container.querySelector('button')!;

                    expect(element.style.height).toEqual('100px');
                    expect(element.style.display).toEqual('none');
                });
            });
        });
    });
});
