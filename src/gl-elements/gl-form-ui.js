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
var GL_Form_UI = (function (_super) {
    __extends(GL_Form_UI, _super);
    function GL_Form_UI() {
        return _super.apply(this, arguments) || this;
    }
    GL_Form_UI.prototype.ready = function () {
    };
    return GL_Form_UI;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", GL_Core.GL_Data)
], GL_Form_UI.prototype, "data", void 0);
GL_Form_UI = __decorate([
    component("gl-form-ui"),
    __metadata("design:paramtypes", [])
], GL_Form_UI);
GL_Form_UI.register();
//# sourceMappingURL=gl-form-ui.js.map