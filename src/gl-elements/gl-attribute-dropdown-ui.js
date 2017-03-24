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
var GL_Attribute_Dropdown_UI = (function (_super) {
    __extends(GL_Attribute_Dropdown_UI, _super);
    function GL_Attribute_Dropdown_UI() {
        var _this = _super.apply(this, arguments) || this;
        _this.isDirty = false;
        return _this;
    }
    ;
    GL_Attribute_Dropdown_UI.prototype.valueChanged = function () {
        this.isDirty = true;
        console.log("data changed", this.value);
    };
    GL_Attribute_Dropdown_UI.prototype.dataChanged = function () {
        var _this = this;
        GL_Core.loadValue(GL_Core.SERVER, this.attribute, this.data)
            .onSuccess(function (D) { _this.value = D; _this.isDirty = false; })
            .execute();
    };
    GL_Attribute_Dropdown_UI.prototype.ready = function () {
    };
    return GL_Attribute_Dropdown_UI;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", GL_Core.GL_Model_Attribute)
], GL_Attribute_Dropdown_UI.prototype, "attribute", void 0);
__decorate([
    property(),
    __metadata("design:type", GL_Core.GL_Data)
], GL_Attribute_Dropdown_UI.prototype, "data", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], GL_Attribute_Dropdown_UI.prototype, "value", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Attribute_Dropdown_UI.prototype, "isDirty", void 0);
__decorate([
    property(),
    __metadata("design:type", GL_Core.GL_Model_Attribute)
], GL_Attribute_Dropdown_UI.prototype, "comboAttribute", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], GL_Attribute_Dropdown_UI.prototype, "comboData", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], GL_Attribute_Dropdown_UI.prototype, "comboDataDescription", void 0);
__decorate([
    observe("value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Attribute_Dropdown_UI.prototype, "valueChanged", null);
__decorate([
    observe("data"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Attribute_Dropdown_UI.prototype, "dataChanged", null);
GL_Attribute_Dropdown_UI = __decorate([
    component("gl-attribute-dropdown-ui"),
    __metadata("design:paramtypes", [])
], GL_Attribute_Dropdown_UI);
GL_Attribute_Dropdown_UI.register();
//# sourceMappingURL=gl-attribute-dropdown-ui.js.map