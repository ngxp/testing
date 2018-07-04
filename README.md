# Angular Testing Helpers & Best Practices

## Test Best Practices

### TL;DR
- Declare Components in the testing module
- Use the NO_ERRORS_SCHEMA
- Import only what is necessary!
- Module imports should generally be avoided
- Provide Mock Services 
- Declare Mock Pipes
- Declare Mock Directives


### Declare Components in the testing module
Don't import the whole module a component is declared in.
> Test
```ts
import { AppComponent } from 'app/app.component';
    ...
TestBed.configureTestingModule({
    ...
    declarations: [
        AppComponent
    ],
    ...
})
```


### Use the NO_ERRORS_SCHEMA
> Test
```ts
import { NO_ERRORS_SCHEMA } from '@angular/core';
...
TestBed.configureTestingModule({
    ...
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    ...
})
```


### Import only what is necessary!
> Component
```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private store: Store<AppState>,
    ) {}
}
```

> Test
```ts
TestBed.configureTestingModule({
    imports: [
        StoreModule.forRoot({}),
        RouterTestingModule // Not Needed! Not used in component
    ]
    declarations: [
        AppComponent
    ]
})
```


### Module imports should generally be avoided 
> Component
```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.init()
    }
}
```

> Test __BAD__
```ts
TestBed.configureTestingModule({
    imports: [
        AuthenticationModule // Don't import everything from a module when you only use one part of it, e.g. the service
    ]
    declarations: [
        AppComponent
    ]
})
```
> Test __BETTER__
```ts
TestBed.configureTestingModule({
    declarations: [
        AppComponent
    ],
    providers: [
        AuthenticationService
    ]
})
```

### Provide Mock Service
> Component
```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.init()
    }
}
```

> Test
```ts
const authenticationServiceMock: AuthenticationService = {
    init(): void {}
};

TestBed.configureTestingModule({
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: AuthenticationService,
            useValue: authenticationServiceMock
        }
    ]
})
```

### Declare Mock Pipes
> Component
```ts
@Component({
    selector: 'user-birthday',
    template: `
        <div>{{ user.birthday | date }}</div>
    `,
    styles: ['']
})
export class UserBirthdayComponent {
    @Input()
    user: User;
}
```

> Test

Declare a pipe inside the test that has the same name as the pipe used in the component template and add it to the `declarations` in the testing module.
```ts
@Pipe({
    name: 'date'
})
export class MockDatePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value;
    }
}

...

TestBed.configureTestingModule({
    declarations: [
        UserBirthdayComponent,
        MockDatePipe
    ]
})
```


### Declare Mock Directives
> Component
```ts
@Component({
    selector: 'user-popover',
    template: `
        <div #popover="ngbPopover">{{ user.name }}</div>
    `,
    styles: ['']
})
export class UserPopoverComponent implements OnDestroy {
    @ViewChild('popover')
    popover: NgbPopover;

    ngOnDestroy() {
        this.popover.close();
    }
}
```

> Test

Declare a directive inside the test that has the same `selector` and `exportAs` as the directive used in the template and add it to the `declarations` in the testing module.

Replace all functions from the directive that are called inside your component with empty functions.

```ts
@Directive({selector: '[ngbPopover]', exportAs: 'ngbPopover'})
export class NgbPopoverMockDirective {
    close(): void {}
}

...

TestBed.configureTestingModule({
    declarations: [
        UserPopoverComponent,
        NgbPopoverMockDirective
    ]
})
```