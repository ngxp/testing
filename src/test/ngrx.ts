import { InjectionToken } from '@angular/core';
import { ReducerConfig } from '@ngx-patterns/testing';

export const reducerConfig: ReducerConfig<any> = {
    injectionToken: new InjectionToken('injectiontToken'),
    reducers: { }
};
