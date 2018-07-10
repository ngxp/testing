import { async, ComponentFixture } from '@angular/core/testing';
import { createComponent, setupComponentTest } from '@ngx-patterns/testing';
import { expectElementFromFixture } from '@ngx-patterns/testing-jest';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    setupComponentTest({
        declarations: [
            AppComponent
        ],
    });

    beforeEach(() => {
        fixture = createComponent(AppComponent);
        fixture.detectChanges();
    });

    it(`should have a h1`, async(() => {
        expectElementFromFixture(fixture, 'h1').toBeTruthy();
    }));
});
