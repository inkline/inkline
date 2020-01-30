function matchParentWidth(el) {
    const parentStyle = getComputedStyle(el.parentElement);
    const width = parseInt(parentStyle.width);
    const padding = parseInt(parentStyle.paddingLeft) + parseInt(parentStyle.paddingRight);

    el.style.width = (width - padding) + 'px';
}

export default {
    bind(el) {
        window.addEventListener('resize', () => matchParentWidth(el));
    },
    inserted(el) {
        matchParentWidth(el);
    },
    update(el) {
        matchParentWidth(el);
    },
    unbind(el) {
        window.removeEventListener('resize', () => matchParentWidth(el));
    }
}