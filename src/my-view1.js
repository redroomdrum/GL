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
var MyTimer = (function (_super) {
    __extends(MyTimer, _super);
    function MyTimer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyTimer.prototype.onError = function (e, s) {
        console.error(e, s);
    };
    MyTimer.prototype.proxyChange = function () {
        console.log(this.proxy);
    };
    MyTimer.prototype.refreshUser = function (data) {
        var _this = this;
        Promise.all([
            GL_Core.SERVICE.doResolve(data, "userRole"),
            GL_Core.SERVICE.doResolve(data, "groups"),
            GL_Core.SERVICE.doResolve(data, "documents"),
            GL_Core.SERVICE.doResolve(data, "documentsToValidate")
        ]).then(function (rs) {
            _this.dataSourceSingle.rawData = data;
        });
    };
    MyTimer.prototype.refresh = function () {
        var _this = this;
        GL_Core.SERVICE.doGetAll(GL_Core.SERVICE._models["app.model.User"]).then(function (ret) { return _this.dataSourceUsers.rawData = ret; });
        GL_Core.SERVICE.doGetAll(GL_Core.SERVICE._models["app.model.UserRole"])
            .then(function (data) { return _this.dataSourceUserRoles.data = data; });
    };
    MyTimer.prototype.loadUserData = function () {
    };
    MyTimer.prototype.ready = function () {
        var _this = this;
        this.dataControllerUserExt = new GL_Core.View();
        this.dataControllerUserExt.createPath("id", "userId");
        this.dataControllerUserExt.createPath("pname", "name");
        this.dataControllerUserExt.createPath("psurname", "surname");
        this.dataControllerUserExt.createPath("puserRole", "userRole");
        this.dataControllerUserExt.createPath("puserRoleDesc", "userRole.name");
        this.dataControllerUser = new GL_Core.View();
        this.dataControllerUser.createPath("id", "userId");
        this.dataControllerUser.createPath("pname", "name");
        this.dataControllerUser.createPath("psurname", "surname");
        this.dataSourceUsers = GL_UI.createDataSourceArray(this.dataControllerUser);
        this.dataSourceSingle = GL_UI.createDataSourceSingle(this.dataControllerUserExt);
        this.dataSourceArray = GL_UI.createDataSourceArray(this.dataControllerUserExt);
        this.dataSourceUserRoles = GL_UI.createDataSourceArray(null);
        new GL_UI.GLNumeric(this.$.insertion, this.dataSourceSingle, "id", {});
        new GL_UI.GLText(this.$.insertion, this.dataSourceSingle, "pname", {});
        new GL_UI.GLText(this.$.insertion, this.dataSourceSingle, "psurname", {});
        new GL_UI.GLComboBox(this.$.insertion, this.dataSourceSingle, "puserRole", {}, this.dataSourceUserRoles, "name");
        new GL_UI.GLText(this.$.insertion, this.dataSourceSingle, "puserRoleDesc", {});
        new GL_UI.GLDatepicker(this.$.insertion, this.dataSourceSingle, "puserRoleDesc", null);
        var item = new GL_UI.GLTextButton(this.$.insertion, this.dataSourceSingle, "puserRoleDesc", null);
        item.controlOptions._onChange("triggerButton").do(function (ev) { return console.log("test"); });
        var options = {};
        options.selectable = true;
        options.columns = [];
        options.columns.push({ field: "id" });
        options.columns.push({ field: "pname" });
        options.columns.push({ field: "psurname" });
        var grid = new GL_UI.GLGrid(this.$.insertion, this.dataSourceUsers, options);
        grid.controlOptions._onChange("selectedRaw").do(function (ev) {
            _this.refreshUser(grid.controlOptions.selectedRaw[0]);
        });
        GL_Core.SERVICE.doInit().then(function (r) { return _this.refresh(); });
    };
    MyTimer.prototype.detatched = function () {
    };
    return MyTimer;
}(polymer.Base));
__decorate([
    property(),
    __metadata("design:type", GL_Core.DataView)
], MyTimer.prototype, "proxy", void 0);
__decorate([
    property(),
    __metadata("design:type", GL_Core.Entity)
], MyTimer.prototype, "data", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], MyTimer.prototype, "roles", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], MyTimer.prototype, "page", void 0);
__decorate([
    property(),
    __metadata("design:type", GL_Core.View)
], MyTimer.prototype, "dataControllerModel", void 0);
__decorate([
    observe("proxy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyTimer.prototype, "proxyChange", null);
MyTimer = __decorate([
    component("my-view1")
], MyTimer);
MyTimer.register();
//# sourceMappingURL=my-view1.js.map