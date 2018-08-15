import { ComponentFixture } from '@angular/core/testing';
import { isUndefined, toArray } from 'lodash-es';

export function elementByQuery(rootElement: Element, domQuery: string): Element | null {
    return rootElement.querySelector(domQuery);
}

export function elementsByQuery(rootElement: Element, domQuery: string): Element[] {
    return toArray<Element>(rootElement.querySelectorAll(domQuery));
}

export function viewChildFromFixture<T>(fixture: ComponentFixture<T>, viewChildProperty: string): Element {
    return (<HTMLElement> fixture.componentInstance[viewChildProperty].nativeElement);
}

export function formElementFromFixture<T>(fixture: ComponentFixture<T>, formControlName: string): Element | null {
    return elementFromFixture(fixture, getFormControlDomQuery(formControlName));
}

export function elementFromFixture<T>(fixture: ComponentFixture<T>, domQuery?: string): Element | null {
    const nativeElement = getNativeElement(fixture);
    return isUndefined(domQuery) ? nativeElement : elementByQuery(nativeElement, domQuery);
}

export function elementsFromFixture<T>(fixture: ComponentFixture<T>, domQuery: string): Element[] {
    const nativeElement = getNativeElement(fixture);
    return elementsByQuery(nativeElement, domQuery);
}

function getNativeElement<T>(fixture: ComponentFixture<T>): HTMLElement {
    fixture.detectChanges();
    return fixture.nativeElement;
}

function getFormControlDomQuery(formControlName: string): string {
    return `[formcontrolname="${formControlName}"]`;
}
