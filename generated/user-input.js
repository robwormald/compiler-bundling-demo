"use strict";
var core_1 = require('@angular/core');
var UserInput = (function () {
    function UserInput() {
        this.action = new core_1.EventEmitter();
    }
    UserInput.prototype.onSubmit = function (el) {
        this.action.emit({
            type: 'ADD_USER',
            payload: {
                name: el.value
            }
        });
        el.value = '';
    };
    /** @nocollapse */
    UserInput.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'user-input',
                    template: "\n\t <input type=\"text\" #input (keyup.enter)=\"onSubmit(input)\" />\n\t ",
                    directives: []
                },] },
    ];
    /** @nocollapse */
    UserInput.propDecorators = {
        'action': [{ type: core_1.Output },],
    };
    return UserInput;
}());
exports.UserInput = UserInput;
