import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { isUndefined } from 'lodash-es';

export function expectActionToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void, payload?: any) {
    const action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).not.toBeUndefined();

    if (!isUndefined(payload)) {
        expect(action['payload']).toEqual(payload);
    }
}

export function expectActionNotToBeDispatched(fixture: ComponentFixture<{}>, actionType: string, triggerFn?: () => void) {
    const action = triggerAndWatchForAction(fixture, actionType, triggerFn);
    expect(action).toBeUndefined();
}

// tslint:disable-next-line
function triggerAndWatchForAction(fixture: ComponentFixture<{}>, actionType: string, triggerFn = () => { }): Action {
    const store = TestBed.get(Store);
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    triggerFn();

    fixture.detectChanges();

    const expectedCall = storeDispatchSpy.mock.calls
        .find(
            callArguments => (!isUndefined(callArguments[0]) && (callArguments[0].type === actionType))
        );

    storeDispatchSpy.mockRestore();
    return isUndefined(expectedCall) ? expectedCall : expectedCall[0];
}
