import { ComponentFixture } from '@angular/core/testing';
import { elementFromFixture, elementsFromFixture, viewChildFromFixture } from '@ngxp/testing';

export function expectComponent<T>(fixture: ComponentFixture<T>) {
    return expect(fixture.componentInstance);
}

export function expectElementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): jasmine.Matchers<{} | null> {
    return expect(elementFromFixture(fixture, domQuery));
}

export function expectElementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): jasmine.ArrayLikeMatchers<{}> {
    return expect(elementsFromFixture(fixture, domQuery));
}

export function expectViewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): jasmine.Matchers<{}> {
    return expect(viewChildFromFixture(fixture, viewChildProperty));
}
