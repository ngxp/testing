import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { configureTestEnvironment, mergeModuleDefs } from './test-helpers';

export function setupComponentTest(moduleDef: TestModuleMetadata): void {
    // workaround to improve component tests: prevent testing module from
    // being reset after every spec
    // see https://github.com/angular/angular/issues/12409
    const resetTestingModuleFn = TestBed.resetTestingModule;

    beforeAll(() => {
        TestBed.resetTestingModule();
        configureComponentTestEnvironment(moduleDef);
        TestBed.resetTestingModule = () => TestBed;
    });

    afterAll(() => {
        TestBed.resetTestingModule = resetTestingModuleFn;
    });
}

// tslint:disable-next-line:variable-name
export function configureComponentTestEnvironment(moduleDef: TestModuleMetadata): void {
    configureTestEnvironment(
        mergeModuleDefs(
            {
                schemas: [
                    NO_ERRORS_SCHEMA
                ]
            },
            moduleDef
        )
    )
        .compileComponents();
}

export function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    return TestBed.createComponent<T>(component);
}

export function forceChangeDetection<T>(fixture: ComponentFixture<T>): void {
    // Forces change detection even on components with change detection set to OnPush
    // see https://github.com/angular/angular/issues/12313#issuecomment-300429985
    // tslint:disable-next-line
    (<any> fixture.changeDetectorRef)._view.nodes[0].componentView.state |= (1 << 3);
}

export function componentFromFixture<T>(fixture: ComponentFixture<T>): T {
    return fixture.componentInstance;
}
