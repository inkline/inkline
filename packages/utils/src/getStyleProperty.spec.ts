import { getStyleProperty } from "./getStyleProperty";

describe("Helpers", () => {
    describe("getStyleProperty()", () => {
        const windowSpy = vi.spyOn(global, "window", "get");
        let element: HTMLElement;

        beforeEach(() => {
            element = document.createElement("div");
        });

        it("should return if element not provided", () => {
            expect(getStyleProperty(undefined, undefined)).toEqual(undefined);
        });

        it("should return if property not provided", () => {
            expect(getStyleProperty(element, undefined)).toEqual(undefined);
        });

        it("should return property using getComputedStyle and getPropertyValue", () => {
            const getPropertyValue = vi.fn();

            windowSpy.mockImplementation(() => ({
                getComputedStyle: () => ({
                    getPropertyValue
                })
            } as unknown as Window & typeof globalThis));

            element.style.padding = "10px";
            getStyleProperty(element, "padding");

            expect(getPropertyValue).toHaveBeenCalled();

            vi.clearAllMocks();
        });

        it("should return if isServer", () => {
            windowSpy.mockImplementation(() => undefined);

            expect(getStyleProperty(element, "property")).toEqual(undefined);

            vi.clearAllMocks();
        });
    });
});
