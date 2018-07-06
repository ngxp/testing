import { elementByQuery, elementsByQuery } from '@ngx-patterns/testing';
declare var expect: jest.Expect;

export function expectElement(rootElement: Element, domQuery: string): jest.Matchers<void> {
    return expect(elementByQuery(rootElement, domQuery));
}

export function expectElements(rootElement: Element, domQuery: string): jest.Matchers<void> {
    return expect(elementsByQuery(rootElement, domQuery));
}
