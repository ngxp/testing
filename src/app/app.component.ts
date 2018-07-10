import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'tst-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tst';
    constructor(
        private store: Store<any>
    ) { }

    submit() {
        this.store.dispatch({ type: 'submit', payload: 'test' });
    }
}
