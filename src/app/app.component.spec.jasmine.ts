import { async, ComponentFixture } from '@angular/core/testing';
import { createComponent, getModuleDefForStore, mergeModuleDefs, setupComponentTest } from '@ngxp/testing';
import { expectActionToBeDispatched, expectElementFromFixture } from '@ngxp/testing-jasmine';
import { reducerConfig } from 'src/test/ngrx';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    setupComponentTest(
        mergeModuleDefs(
            getModuleDefForStore(reducerConfig),
            {
                declarations: [
                    AppComponent
                ]
            }
        )
    );

    beforeEach(() => {
        fixture = createComponent(AppComponent);
        fixture.detectChanges();
    });

    it(`should have a h1`, async(() => {
        expectElementFromFixture(fixture, 'h1').toBeTruthy();
    }));

    it('dispatches an action', () => {
        expectActionToBeDispatched(
            fixture,
            'submit',
            () => fixture.componentInstance.submit(),
            'test'
        );
    });
});
