import {Component} from '@angular/core'
import {AsyncPipe, NgFor} from '@angular/common'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Observable'
import {UserList} from './user-list'
import {UserInput} from './user-input'

@Component({
	selector: 'component-one',
	template: `
	  <div>Users</div>
	  <user-input (action)="store.dispatch($event)"></user-input>
	  <user-list [users]="users | async"></user-list>
 	`,
	 pipes: [AsyncPipe],
	 directives: [NgFor, UserList, UserInput]
})
export class App {
	users: Observable<any[]>
	constructor(public store:Store<any>){
		this.users = store.select('users');

		setTimeout(() => {
			store.dispatch({type: 'ADD_USER', payload: {name: 'rob'}})
		}, 1000)
	}
}
