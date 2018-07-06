import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { cloneDeep, isArray, mergeWith } from 'lodash-es';

const defaultModuleDef: TestModuleMetadata = {
    imports: [],
    providers: [],
    declarations: [],
    schemas: []
};

export function mergeModuleDefs(...moduleDefs: TestModuleMetadata[]): TestModuleMetadata {
    return moduleDefs.reduce(
        (moduleDef1, moduleDef2) => mergeWith(
            moduleDef1,
            moduleDef2,
            (newValue, value) => isArray(newValue) ? newValue.concat(value) : undefined
        ),
        cloneDeep(defaultModuleDef)
    );
}


export function configureTestEnvironment(moduleDef: TestModuleMetadata) {
    return TestBed
        .configureTestingModule(moduleDef);
}
