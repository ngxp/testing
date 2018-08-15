import { InjectionToken } from '@angular/core';
import { ReducerConfig } from '@ngxp/testing';

export const reducerConfig: ReducerConfig<any> = {
    injectionToken: new InjectionToken('injectiontToken'),
    reducers: { }
};
