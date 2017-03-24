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
var GL_Message = GL_Message_1 = (function (_super) {
    __extends(GL_Message, _super);
    function GL_Message() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = GL_Message_1.LEVEL_TRACE;
        return _this;
    }
    GL_Message.prototype.reset = function () {
        this.enable = false;
        this.$.glmessage.classList.add("disable");
        this.$.glmessage.classList.remove(this.level);
    };
    GL_Message.prototype.show = function (level, message) {
        this.reset();
        this.enable = true;
        this.message = message;
        this.level = level;
        switch (level) {
            case GL_Message_1.LEVEL_TRACE:
                this.icon = "icons:radio-button-unchecked";
                break;
            case GL_Message_1.LEVEL_INFO:
                this.icon = "icons:info-outline";
                break;
            case GL_Message_1.LEVEL_ERROR:
                this.icon = "icons:error-outline";
                break;
            case GL_Message_1.LEVEL_OK:
                this.icon = "icons:check";
                break;
        }
        this.$.glmessage.classList.remove("disable");
        this.$.glmessage.classList.add(level);
    };
    GL_Message.prototype.ready = function () {
        this.reset();
        if (this.level && this.message)
            this.show(this.level, this.message);
    };
    return GL_Message;
}(polymer.Base));
GL_Message.LEVEL_TRACE = "trace";
GL_Message.LEVEL_INFO = "info";
GL_Message.LEVEL_ERROR = "error";
GL_Message.LEVEL_OK = "ok";
__decorate([
    property(),
    __metadata("design:type", String)
], GL_Message.prototype, "icon", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], GL_Message.prototype, "message", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], GL_Message.prototype, "level", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GL_Message.prototype, "enable", void 0);
GL_Message = GL_Message_1 = __decorate([
    component("gl-message")
], GL_Message);
GL_Message.register();
var GL_Message_1;
//# sourceMappingURL=gl-message.js.map