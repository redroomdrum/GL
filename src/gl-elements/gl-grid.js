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
var GL_Grid = (function (_super) {
    __extends(GL_Grid, _super);
    function GL_Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GL_Grid.prototype.refresh = function () {
        if (this.widget && this.widgetOptions && this.datas) {
            this.widget.dataSource.data(this.datas);
            this.widget.dataSource.query();
        }
    };
    GL_Grid.prototype.createOptions = function () {
    };
    GL_Grid.prototype.refreshOptions = function () {
        this.widget.setOptions(this.widgetOptions);
    };
    GL_Grid.prototype._createWidget = function () {
        this.dataSource = new kendo.data.DataSource();
        this.widgetOptions = {};
        this.widgetOptions.dataSource = this.dataSource;
        this.widget = new kendo.ui.Grid(this._getElement(), this.widgetOptions);
    };
    GL_Grid.prototype._getElement = function () {
        return this.$.kelement;
    };
    return GL_Grid;
}(GL_UI.ControlGroup_Base));
GL_Grid = __decorate([
    component("gl-grid")
], GL_Grid);
GL_Grid.register();
//# sourceMappingURL=gl-grid.js.map