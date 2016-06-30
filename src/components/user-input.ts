import {Component, Output, EventEmitter} from '@angular/core'

@Component({
	selector: 'user-input',
	template: `
	 <input type="text" #input (keyup.enter)="onSubmit(input)" />
	 `,
	directives: []
})
export class UserInput {
	@Output() action = new EventEmitter();

	onSubmit(el){
		this.action.emit({
			type: 'ADD_USER',
			payload: {
				name: el.value
			}
		});
	    el.value = '';
	}
}
