import 'reflect-metadata';
import "rxjs/add/operator/map";
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';

interface Person {
    name: string;
    age: number;
}

@Component({
	selector: 'main',
	template: `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
    <Label [text]='"loaded people: " + people.length' class='title'></Label>
</StackLayout>
`,
})
export class MainPage {
    public message: string = "Hello, Angular!";
    @Input() public people: Person[] = [];

    constructor(private http: Http) {
        console.log('HTTP: ' + http);
    }

    public ngOnInit() {
        this.http.get('http://192.168.56.1:3000/data.json')
            .map(response => {
                console.dump(response.json());
                return response.json()
            })
            .subscribe(
                response => this.people = response.result,
                error => console.dump(error))
    }
}
