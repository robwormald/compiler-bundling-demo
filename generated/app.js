"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var store_1 = require('@ngrx/store');
var user_list_1 = require('./user-list');
var user_input_1 = require('./user-input');
var App = (function () {
    function App(store) {
        this.store = store;
        this.users = store.select('users');
        setTimeout(function () {
            store.dispatch({ type: 'ADD_USER', payload: { name: 'rob' } });
        }, 1000);
    }
    /** @nocollapse */
    App.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'component-one',
                    template: "\n\t  <div>Users</div>\n\t  <user-input (action)=\"store.dispatch($event)\"></user-input>\n\t  <user-list [users]=\"users | async\"></user-list>\n \t",
                    pipes: [common_1.AsyncPipe],
                    directives: [common_1.NgFor, user_list_1.UserList, user_input_1.UserInput]
                },] },
    ];
    /** @nocollapse */
    App.ctorParameters = [
        { type: store_1.Store, },
    ];
    return App;
}());
exports.App = App;
