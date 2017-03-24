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
var GL_DatePicker = (function (_super) {
    __extends(GL_DatePicker, _super);
    function GL_DatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GL_DatePicker.prototype.refresh = function () {
        if (this.widget && this.widgetOptions) {
        }
    };
    GL_DatePicker.prototype.createOptions = function () {
    };
    GL_DatePicker.prototype.refreshOptions = function () {
        this.widget.setOptions(this.widgetOptions);
    };
    GL_DatePicker.prototype._createWidget = function () {
        this.widgetOptions = {};
        this.widgetOptions.culture = "it-IT";
        this.widgetOptions.format = "dd/MM/yyyy";
        this.widgetOptions.change = function (event) {
        };
        this.widget = new kendo.ui.DatePicker(this._getElement(), this.widgetOptions);
    };
    GL_DatePicker.prototype._getElement = function () {
        return this.$.kelement;
    };
    return GL_DatePicker;
}(GL_UI.ControlSingle_Base));
GL_DatePicker = __decorate([
    component("gl-datepicker")
], GL_DatePicker);
GL_DatePicker.register();
//# sourceMappingURL=gl-datepicker.js.map