var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GL_NumericTextBox = (function (_super) {
    __extends(GL_NumericTextBox, _super);
    function GL_NumericTextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GL_NumericTextBox.prototype.refresh = function () {
        if (this.widget && this.widgetOptions) {
            this.widget.value(this.value);
        }
    };
    GL_NumericTextBox.prototype.createOptions = function () {
    };
    GL_NumericTextBox.prototype.refreshOptions = function () {
        this.widget.setOptions(this.widgetOptions);
    };
    GL_NumericTextBox.prototype._createWidget = function () {
        var _this = this;
        this.widgetOptions = {};
        this.widgetOptions.change = function (event) {
            _this.value = _this.widget.value();
        };
        this.widget = new kendo.ui.NumericTextBox(this._getElement(), this.widgetOptions);
    };
    GL_NumericTextBox.prototype._getElement = function () {
        return this.$.kelement;
    };
    return GL_NumericTextBox;
}(GL_UI.ControlSingle_Base));
GL_NumericTextBox = __decorate([
    component("gl-numerictextbox")
], GL_NumericTextBox);
GL_NumericTextBox.register();
//# sourceMappingURL=gl-numerictextbox.js.map