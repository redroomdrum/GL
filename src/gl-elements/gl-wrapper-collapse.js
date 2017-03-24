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
var GL_Wrapper_Collapse = (function (_super) {
    __extends(GL_Wrapper_Collapse, _super);
    function GL_Wrapper_Collapse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iconOpen = "fa-plus";
        _this.iconClose = "fa-minus";
        return _this;
    }
    GL_Wrapper_Collapse.prototype.onIsValidatedChange = function () {
        this.refresh();
    };
    GL_Wrapper_Collapse.prototype.onIsValidChange = function () {
        this.refresh();
    };
    GL_Wrapper_Collapse.prototype.handleToggle = function () {
        this.opened = !this.opened;
        this.refresh();
    };
    GL_Wrapper_Collapse.prototype.refresh = function () {
        if (this.opened) {
            this.$.icon.classList.remove(this.iconOpen);
            this.$.icon.classList.add(this.iconClose);
        }
        else {
            this.$.icon.classList.add(this.iconOpen);
            this.$.icon.classList.remove(this.iconClose);
        }
    };
    GL_Wrapper_Collapse.prototype.ready = function () {
        this.refresh();
    };
    return GL_Wrapper_Collapse;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", String)
], GL_Wrapper_Collapse.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], GL_Wrapper_Collapse.prototype, "col", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Wrapper_Collapse.prototype, "opened", void 0);
__decorate([
    observe("isvalidated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Wrapper_Collapse.prototype, "onIsValidatedChange", null);
__decorate([
    observe("isvalid"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GL_Wrapper_Collapse.prototype, "onIsValidChange", null);
GL_Wrapper_Collapse = __decorate([
    component("gl-wrapper-collapse")
], GL_Wrapper_Collapse);
GL_Wrapper_Collapse.register();
//# sourceMappingURL=gl-wrapper-collapse.js.map