// Define setter-getter properties on the specified parent objects
//
// [ parentObject, setterGetterProperty ]
//
[
    [ window.navigator, 'userAgent' ],
    [ window.navigator, 'vendor' ],
    [ window, 'opera' ]
].forEach(([object, property]) => {
    Object.defineProperty(object, property, ((value) => ({
        get() { return value; },
        set(v) { value = v; }
    }))(object[property]));
});
