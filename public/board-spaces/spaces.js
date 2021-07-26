"use strict";
/*  Using Classes to Describe the traits for each space type on the board  */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// prettier-ignore
var Space = /** @class */ (function () {
    function Space(a, b) {
        this.name = a;
        this.occupants = b;
    }
    return Space;
}());
// prettier-ignore
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(a, b, c, d, e, f) {
        var _this = _super.call(this, a, b) || this;
        _this.color = c;
        _this.price = d;
        _this.rent = e;
        _this.mortgage_status = f;
        return _this;
    }
    return Property;
}(Space));
// prettier-ignore
var Go = /** @class */ (function (_super) {
    __extends(Go, _super);
    function Go(a, b, c, d) {
        var _this = _super.call(this, a, b) || this;
        _this.salary = c;
        _this.bonus = d;
        return _this;
    }
    return Go;
}(Space));
// prettier-ignore
var Tax = /** @class */ (function (_super) {
    __extends(Tax, _super);
    function Tax(a, b, c) {
        var _this = _super.call(this, a, b) || this;
        _this.amount_owed = c;
        return _this;
    }
    return Tax;
}(Space));
// prettier-ignore
var Free_Parking = /** @class */ (function (_super) {
    __extends(Free_Parking, _super);
    function Free_Parking(a, b, c) {
        var _this = _super.call(this, a, b) || this;
        _this.kitty_value = c;
        return _this;
    }
    return Free_Parking;
}(Space));
var Community_Chest = /** @class */ (function (_super) {
    __extends(Community_Chest, _super);
    function Community_Chest(a, b) {
        return _super.call(this, a, b) || this;
    }
    return Community_Chest;
}(Space));
var Chance = /** @class */ (function (_super) {
    __extends(Chance, _super);
    function Chance(a, b) {
        return _super.call(this, a, b) || this;
    }
    return Chance;
}(Space));
var Utility = /** @class */ (function (_super) {
    __extends(Utility, _super);
    function Utility(a, b) {
        return _super.call(this, a, b) || this;
    }
    return Utility;
}(Space));
var Railroad = /** @class */ (function (_super) {
    __extends(Railroad, _super);
    function Railroad(a, b) {
        return _super.call(this, a, b) || this;
    }
    return Railroad;
}(Space));
var Jail = /** @class */ (function (_super) {
    __extends(Jail, _super);
    function Jail(a, b) {
        return _super.call(this, a, b) || this;
    }
    return Jail;
}(Space));
