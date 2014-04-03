define(function() {
    return function(object) {
        // not object, not dom el, not window
        if (typeof object !== "object" || object.nodeType || (object !== null && object === object.window)) {
            return false;
        }   
        if (object.constructor && !object.hasOwnProperty.call(object.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
        return true;
    };

});
