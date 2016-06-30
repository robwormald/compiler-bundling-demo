import {Component, Input, ChangeDetectionStrategy} from '@angular/core'
import {AsyncPipe, NgFor} from '@angular/common'

@Component({
	selector: 'user-list',
	template: `
	  <ul>
	    <li *ngFor="let user of users">{{user.name}}</li>
	  </ul>
 	`,
	directives: [NgFor],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList {
	@Input() users:any;
}
