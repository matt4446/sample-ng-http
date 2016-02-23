///<reference path="../node_modules/angular2/typings/browser.d.ts" />
import "rxjs/add/operator/map";
import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';

interface Person {
    name: string;
    age: number;
}

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
    <div>{{people | json}}</div>
    `
})
export class AppComponent {
    @Input() private people: Person[];

    constructor(private http: Http) {
    }

    public ngOnInit() {
        this.http.get('https://breakouttrampoliningwebservices.azurewebsites.net/Api/Providers/List/Enabled')
            .map(response => {
                console.log(response.json);
                console.log(response.json());
                return response.json()
            })
            .subscribe((items: Person[]) => {
                console.log('items: ' + items);
                this.people = items;
            }, error => console.log(error))
    }
}
