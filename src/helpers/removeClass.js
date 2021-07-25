import { hasClass } from './hasClass';
import { trim } from './trim';

export function removeClass (element, classes) {
    if (!element || !classes) return;

    const classList = classes.split(' ');
    let currentClass = ' ' + element.className + ' ';

    for (let i = 0, j = classList.length; i < j; i++) {
        const className = classList[i];
        if (!className) continue;

        if (element.classList) {
            element.classList.remove(className);
        } else if (hasClass(element, className)) {
            currentClass = currentClass.replace(' ' + className + ' ', ' ');
        }
    }

    if (!element.classList) {
        element.className = trim(currentClass);
    }
}
