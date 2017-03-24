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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GL_Wrapper_Control = (function (_super) {
    __extends(GL_Wrapper_Control, _super);
    function GL_Wrapper_Control() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GL_Wrapper_Control.prototype.onIsValidatedChange = function () {
        this.refresh();
    };
    GL_Wrapper_Control.prototype.onIsValidChange = function () {
        this.refresh();
    };
    GL_Wrapper_Control.prototype.refresh = function () {
        var element = this.$.element;
        if (this.isvalidated && !this.isvalid) {
            this.currentmessage = this.errormessage;
            element.classList.add("has-error");
            var all = element.getElementsByTagName('*');
            for (var i = -1, l = all.length; ++i < l;) {
                all[i].classList.add("has-error");
            }
        }
        else {
            this.currentmessage = this.infomessage;
            element.classList.remove("has-error");
            var all = element.getElementsByTagName('*');
            for (var i = -1, l = all.length; ++i < l;) {
                all[i].classList.remove("has-error");
            }
        }
    };
    GL_Wrapper_Control.prototype.ready = function () {
        this.refresh();
    };
    return GL_Wrapper_Control;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", String)
], GL_Wrapper_Control.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], GL_Wrapper_Control.prototype, "col", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Control.prototype, "isvalidated", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Control.prototype, "isvalid", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Control.prototype, "errormessage", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Control.prototype, "infomessage", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Control.prototype, "currentmessage", void 0);
__decorate([
    observe("isvalidated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Wrapper_Control.prototype, "onIsValidatedChange", null);
__decorate([
    observe("isvalid"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Wrapper_Control.prototype, "onIsValidChange", null);
GL_Wrapper_Control = __decorate([
    component("gl-wrapper-control")
], GL_Wrapper_Control);
GL_Wrapper_Control.register();
//# sourceMappingURL=gl-wrapper-control.js.map