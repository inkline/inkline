import { hasClass } from './has-class';

export function addClass (element, classes) {
    if (!element) return;

    let currentClass = element.className;
    classes = (classes || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const className = classes[i];
        if (!className) continue;

        if (element.classList) {
            element.classList.add(className);
        } else if (!hasClass(element, className)) {
            currentClass += ' ' + className;
        }
    }

    if (!element.classList) {
        element.className = currentClass;
    }
}
