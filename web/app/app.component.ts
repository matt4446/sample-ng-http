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
        this.http.get('http://localhost:3000/data.json')
            .map(response => {
                console.log(response.json);
                console.log(response.json());
                return response.json()
            })
            .subscribe(
                response => this.people = response.result,
                error => console.log('ERROR: ' + error))
    }
}
