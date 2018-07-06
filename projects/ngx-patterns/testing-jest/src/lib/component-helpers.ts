import { ComponentFixture } from '@angular/core/testing';
import { elementFromFixture, elementsFromFixture, viewChildFromFixture } from '@ngx-patterns/testing';
declare var expect: jest.Expect;

export function expectComponent<T>(fixture: ComponentFixture<T>): jest.Matchers<void> {
    return expect(fixture.componentInstance);
}

export function expectElementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): jest.Matchers<void> {
    return expect(elementFromFixture(fixture, domQuery));
}

export function expectElementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): jest.Matchers<void> {
    return expect(elementsFromFixture(fixture, domQuery));
}

export function expectViewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): jest.Matchers<void> {
    return expect(viewChildFromFixture(fixture, viewChildProperty));
}
