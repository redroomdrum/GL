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
var GL_TextBox = (function (_super) {
    __extends(GL_TextBox, _super);
    function GL_TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GL_TextBox.prototype._getWidgetValue = function () {
        return "";
    };
    GL_TextBox.prototype.refresh = function () {
        if (this.widget) {
            this.widget.value = this.value;
        }
    };
    GL_TextBox.prototype.refreshOptions = function () {
    };
    GL_TextBox.prototype.createOptions = function () {
    };
    GL_TextBox.prototype._createWidget = function () {
        var _this = this;
        this.widget = this.$.kelement;
        this.widget.addEventListener('blur', function (event) {
            _this.data[_this.field] = _this.widget.value;
        });
    };
    GL_TextBox.prototype._getElement = function () {
        return this.$.kelement;
    };
    return GL_TextBox;
}(GL_UI.ControlSingle_Base));
GL_TextBox = __decorate([
    component("gl-textbox")
], GL_TextBox);
GL_TextBox.register();
//# sourceMappingURL=gl-textbox.js.map