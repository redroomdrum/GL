var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GL_Base = (function (_super) {
    __extends(GL_Base, _super);
    function GL_Base() {
        var _this = _super.apply(this, arguments) || this;
        _this.isDirty = false;
        return _this;
    }
    GL_Base.prototype.valueChanged = function () {
        this.isDirty = false;
        if (this.widget)
            this._updateWidgetValue();
    };
    GL_Base.prototype.optionsChanged = function () {
        if (this.widget)
            this._updateWidgetOptions();
    };
    GL_Base.prototype.isDirtyChanged = function () {
        if (this.isDirty) {
            this._getElement().classList.add("gl-dirty");
        }
        else {
            this._getElement().classList.remove("gl-dirty");
        }
    };
    GL_Base.prototype.ready = function () {
        this.widgetOptions = this._createWidgetOptions();
        this.widget = this._createWidget();
        this._updateWidgetOptions();
        this._updateWidgetValue();
        this.isDirty = false;
    };
    return GL_Base;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", Object)
], GL_Base.prototype, "value", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Base.prototype, "isDirty", void 0);
__decorate([
    observe("value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Base.prototype, "valueChanged", null);
__decorate([
    observe("widgetOptions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Base.prototype, "optionsChanged", null);
__decorate([
    observe("isDirty"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Base.prototype, "isDirtyChanged", null);
//# sourceMappingURL=gl-base.js.map