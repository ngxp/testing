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
function triggerAndWatchForAction(fixture: ComponentFixture<{}>, actionType: string, triggerFn = () => {}): Action {
    const store = TestBed.get(Store);
    let storeDispatchSpy: jasmine.Spy;

    if (isUndefined(store.dispatch.calls)) {
        storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    } else {
        storeDispatchSpy = store.dispatch;
        storeDispatchSpy.calls.reset();
    }

    triggerFn();

    fixture.detectChanges();

    const expectedCall = storeDispatchSpy.calls
        .all()
        .find(
            call => (!isUndefined(call.args[0]) && (call.args[0].type === actionType))
        );

    return isUndefined(expectedCall) ? expectedCall : expectedCall.args[0];
}
