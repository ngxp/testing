import { InjectionToken } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { isUndefined } from 'lodash-es';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { configureTestEnvironment, mergeModuleDefs } from './test-helpers';

export interface ReducerConfig<T> {
    injectionToken: InjectionToken<ActionReducerMap<T>>;
    reducers: ActionReducerMap<T>;
}

export function configureEffectsTestEnvironment<T>(
    EffectsClass: {},
    actionsFn: () => Observable<Action>,
    moduleDef: TestModuleMetadata,
    reducerConfig: ReducerConfig<T>,
    appState?: T
) {
    configureTestEnvironment(
        mergeModuleDefs(
            getModuleDefForStore(reducerConfig, appState),
            {
                providers: [
                    EffectsClass,
                    provideMockActions(actionsFn)
                ]
            },
            moduleDef
        )
    );
}

export function getModuleDefForStore<T>(reducerConfig: ReducerConfig<T>, appState?: T): TestModuleMetadata {
    return {
        imports: [
            StoreModule.forRoot(reducerConfig.injectionToken, {
                initialState: isUndefined(appState) ? {} : appState
            })
        ],
        providers: [
            { provide: reducerConfig.injectionToken, useValue: reducerConfig.reducers }
        ]
    };
}

export function getAppState<T>(stateFn: (T) => void) {
    getStore()
        .pipe(
            take(1)
        )
        .subscribe(appState => stateFn(appState));
}

function getStore<T>(): Store<T> {
    return TestBed.get(Store);
}
