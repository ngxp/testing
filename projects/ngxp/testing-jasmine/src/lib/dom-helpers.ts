import { elementByQuery, elementsByQuery } from '@ngxp/testing';

export function expectElement(rootElement: Element, domQuery: string): jasmine.Matchers<{} | null> {
    return expect(elementByQuery(rootElement, domQuery));
}

export function expectElements(rootElement: Element, domQuery: string): jasmine.ArrayLikeMatchers<{}> {
    return expect(elementsByQuery(rootElement, domQuery));
}
