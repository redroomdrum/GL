var GL_Presenter;
(function (GL_Presenter) {
    var Event = (function () {
        function Event() {
        }
        return Event;
    }());
    GL_Presenter.Event = Event;
    var EventProvider = (function () {
        function EventProvider() {
            this._listeners = [];
        }
        EventProvider.prototype.register = function (element) {
            this._listeners.push(element);
        };
        EventProvider.prototype.remove = function (element) {
            this._listeners = this._listeners.filter(function (f) { return f == element; });
        };
        EventProvider.prototype.fire = function (event) {
            for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
                var call = _a[_i];
                call(event);
            }
        };
        return EventProvider;
    }());
    GL_Presenter.EventProvider = EventProvider;
})(GL_Presenter || (GL_Presenter = {}));
//# sourceMappingURL=gl_presenter.js.map