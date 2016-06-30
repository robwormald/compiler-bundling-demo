"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var UserList = (function () {
    function UserList() {
    }
    /** @nocollapse */
    UserList.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'user-list',
                    template: "\n\t  <ul>\n\t    <li *ngFor=\"let user of users\">{{user.name}}</li>\n\t  </ul>\n \t",
                    directives: [common_1.NgFor],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    UserList.propDecorators = {
        'users': [{ type: core_1.Input },],
    };
    return UserList;
}());
exports.UserList = UserList;
