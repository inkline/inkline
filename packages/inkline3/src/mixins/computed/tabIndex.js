/**
 * Return correct tab index. The tab index will be -1 if the form element is disabled.
 */
export function tabIndex() {
    return this.disabled || this.isDisabled ? -1 : this.tabindex;
}
