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
var GL_UI;
(function (GL_UI) {
    var Converter = (function () {
        function Converter(convert, convertBack) {
            this._c_convert = convert;
            this._c_convertBack = convertBack;
        }
        return Converter;
    }());
    GL_UI.Converter = Converter;
    var Validator = (function () {
        function Validator(validate) {
            this._c_validate = validate;
        }
        Validator.prototype.executeValidation = function (value) {
            if (this._c_validate)
                return this._c_validate(value);
            return null;
        };
        return Validator;
    }());
    GL_UI.Validator = Validator;
    var Descriptor = (function () {
        function Descriptor(description) {
            this._c_description = description;
        }
        Descriptor.prototype.getDescription = function (value) {
            if (this._c_description)
                return this._c_description(value);
            return null;
        };
        return Descriptor;
    }());
    GL_UI.Descriptor = Descriptor;
    var Descriptor_Constant = (function (_super) {
        __extends(Descriptor_Constant, _super);
        function Descriptor_Constant(message) {
            var _this = _super.call(this, function (v) { return _this.message; }) || this;
            _this.message = "";
            _this.message = message;
            return _this;
        }
        return Descriptor_Constant;
    }(Descriptor));
    GL_UI.Descriptor_Constant = Descriptor_Constant;
    var Descriptor_StringCharCount = (function (_super) {
        __extends(Descriptor_StringCharCount, _super);
        function Descriptor_StringCharCount(count) {
            var _this = _super.call(this, function (input) {
                var c = 0;
                if (input)
                    c = input.length;
                return c + "/" + _this.charCount;
            }) || this;
            _this.charCount = 10;
            _this.charCount = count;
            return _this;
        }
        return Descriptor_StringCharCount;
    }(Descriptor));
    GL_UI.Descriptor_StringCharCount = Descriptor_StringCharCount;
    var Validator_StringRequired = (function (_super) {
        __extends(Validator_StringRequired, _super);
        function Validator_StringRequired(mes) {
            var _this = _super.call(this, function (input) {
                if (!input)
                    return _this.message;
                if (input == "")
                    return _this.message;
                return null;
            }) || this;
            _this.message = "Required!";
            if (mes)
                _this.message = mes;
            return _this;
        }
        return Validator_StringRequired;
    }(Validator));
    GL_UI.Validator_StringRequired = Validator_StringRequired;
    var Validator_NotNull = (function (_super) {
        __extends(Validator_NotNull, _super);
        function Validator_NotNull(mes) {
            var _this = _super.call(this, function (input) {
                if (!input)
                    return _this.message;
                return null;
            }) || this;
            _this.message = "Required!";
            if (mes)
                _this.message = mes;
            return _this;
        }
        return Validator_NotNull;
    }(Validator));
    GL_UI.Validator_NotNull = Validator_NotNull;
    var Validator_NumberMin = (function (_super) {
        __extends(Validator_NumberMin, _super);
        function Validator_NumberMin(num, mes) {
            var _this = _super.call(this, function (input) {
                if (!input)
                    return null;
                if (input < _this.num)
                    return _this.message;
                return null;
            }) || this;
            _this.message = "Out of range, minimum";
            _this.num = 0;
            if (mes)
                _this.message = mes;
            _this.num = num;
            return _this;
        }
        return Validator_NumberMin;
    }(Validator));
    GL_UI.Validator_NumberMin = Validator_NumberMin;
    var Validator_NumberMax = (function (_super) {
        __extends(Validator_NumberMax, _super);
        function Validator_NumberMax(num, mes) {
            var _this = _super.call(this, function (input) {
                if (!input)
                    return null;
                if (input > _this.num)
                    return _this.message;
                return null;
            }) || this;
            _this.message = "Out of range, maximum!";
            _this.num = 0;
            if (mes)
                _this.message = mes;
            _this.num = num;
            return _this;
        }
        return Validator_NumberMax;
    }(Validator));
    GL_UI.Validator_NumberMax = Validator_NumberMax;
    var GL_UI_Validator_StringCharCount = (function (_super) {
        __extends(GL_UI_Validator_StringCharCount, _super);
        function GL_UI_Validator_StringCharCount(count, mes) {
            var _this = _super.call(this, function (input) {
                if (!input)
                    return null;
                if (input == "")
                    return null;
                if (input.length > _this.charCount)
                    return _this.message;
                return null;
            }) || this;
            _this.message = "Too long!";
            _this.charCount = 10;
            if (mes)
                _this.message = mes;
            _this.charCount = count;
            return _this;
        }
        return GL_UI_Validator_StringCharCount;
    }(Validator));
    GL_UI.GL_UI_Validator_StringCharCount = GL_UI_Validator_StringCharCount;
    function createDataSourceSingle(controller) {
        var ret = GL_Core.Data.create({});
        ret._createField("rawData");
        ret._createField("data");
        ret["_controller"] = controller;
        var ds = ret;
        ds._onChange("rawData").do(function (src) {
            if (ds.rawData == null) {
                ds.data = null;
            }
            else if (ds._controller) {
                ds.data = ds._controller.createViewSingle(ds.rawData);
            }
            else {
                ds.data = ds.rawData;
            }
        });
        return ds;
    }
    GL_UI.createDataSourceSingle = createDataSourceSingle;
    function createDataSourceArray(controller) {
        var ret = GL_Core.Data.create({});
        ret._createField("rawData");
        ret._createField("data");
        ret["_controller"] = controller;
        var ds = ret;
        ds._onChange("rawData").do(function (src) {
            if (ds.rawData == null) {
                ds.data = null;
            }
            else if (ds._controller) {
                ds.data = ds._controller.createViewArray(ds.rawData);
            }
            else {
                ds.data = ds.rawData;
            }
        });
        return ds;
    }
    GL_UI.createDataSourceArray = createDataSourceArray;
    var GLControlOptions = (function (_super) {
        __extends(GLControlOptions, _super);
        function GLControlOptions() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.readOnly = false;
            _this.dirty = false;
            _this.busy = false;
            _this.error = false;
            _this.errorMsg = "";
            _this.infoMsg = "";
            return _this;
        }
        ;
        return GLControlOptions;
    }(GL_Core.Data));
    GL_UI.GLControlOptions = GLControlOptions;
    var GLControlFieldOptions = (function (_super) {
        __extends(GLControlFieldOptions, _super);
        function GLControlFieldOptions() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.field = "";
            return _this;
        }
        return GLControlFieldOptions;
    }(GLControlOptions));
    GL_UI.GLControlFieldOptions = GLControlFieldOptions;
    var GLControlGridOptions = (function (_super) {
        __extends(GLControlGridOptions, _super);
        function GLControlGridOptions() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selected = new GL_Core.GL_Array();
            _this.selectedRaw = new GL_Core.GL_Array();
            return _this;
        }
        return GLControlGridOptions;
    }(GLControlOptions));
    GL_UI.GLControlGridOptions = GLControlGridOptions;
    var GL_Control = (function () {
        function GL_Control(rooNode, source, options) {
            this.dataSource = source;
            this.rootElement = rooNode;
            this.widgetOptions = options;
            this.controlOptions = this._buildControlOptions();
        }
        return GL_Control;
    }());
    GL_UI.GL_Control = GL_Control;
    var GLGrid = (function (_super) {
        __extends(GLGrid, _super);
        function GLGrid(rooNode, source, options) {
            var _this = _super.call(this, rooNode, source, options) || this;
            _this.dataSource._onChange("data").do(function (r) { return _this._refreshFromDataSource(); });
            _this.widgetOptions.dataSource = new kendo.data.DataSource();
            _this.widgetOptions.change = function (ev) {
                var index = _this.widget.select().index();
                var data = _this.dataSource.data[index];
                var dataRaw = _this.dataSource.rawData[index];
                var selection = new GL_Core.GL_Array();
                selection.push(data);
                var selectionRaw = new GL_Core.GL_Array();
                selectionRaw.push(dataRaw);
                _this.controlOptions.selected = selection;
                _this.controlOptions.selectedRaw = selectionRaw;
            };
            _this._kdataSource = _this.widgetOptions.dataSource;
            _this._build();
            return _this;
        }
        GLGrid.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new GLControlGridOptions());
        };
        GLGrid.prototype._build = function () {
            this.element = document.createElement("div");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            this.widget = new kendo.ui.Grid(this.element, this.widgetOptions);
        };
        GLGrid.prototype._refreshFromDataSource = function () {
            var arr = [];
            for (var _i = 0, _a = this.dataSource.data; _i < _a.length; _i++) {
                var d = _a[_i];
                arr.push(d._values);
            }
            this._kdataSource.data(arr);
            this._kdataSource.query();
        };
        return GLGrid;
    }(GL_Control));
    GL_UI.GLGrid = GLGrid;
    var GL_ControlField = (function (_super) {
        __extends(GL_ControlField, _super);
        function GL_ControlField(rooNode, source, field, options) {
            var _this = _super.call(this, rooNode, source, options) || this;
            _this._dataChangeListener = function (r) { return _this._refreshFromData(); };
            _this.controlOptions.field = field;
            _this.dataSource._onChange("data").do(function (r) { return _this._refreshFromDataSource(r); });
            _this.controlOptions._onChange("readOnly").do(function (r) { return _this._onReadOnlyChanged(); });
            _this.controlOptions._onChange("dirty").do(function (r) { return _this._onDirtyChanged(); });
            return _this;
        }
        GL_ControlField.prototype._onUIValueChange = function (value) {
            if (this.dataSource.data[this.controlOptions.field] != value) {
                this.dataSource.data[this.controlOptions.field] = value;
            }
        };
        GL_ControlField.prototype._refreshFromDataSource = function (ev) {
            if (!this.dataSource.data._exists(this.controlOptions.field))
                throw new Error("Field not found: " + this.controlOptions.field);
            if (ev.oldValue) {
                ev.newValue._eventsOnChange[this.controlOptions.field].undo(this._dataChangeListener);
            }
            if (ev.newValue) {
                ev.newValue._eventsOnChange[this.controlOptions.field].do(this._dataChangeListener);
            }
            this._refreshUI();
        };
        GL_ControlField.prototype._refreshFromData = function () {
            this._refreshUI();
        };
        GL_ControlField.prototype._refreshUI = function () {
            if (this.dataSource && this.dataSource.data && this.widget) {
                this._setUIValue(this.dataSource.data[this.controlOptions.field]);
            }
        };
        return GL_ControlField;
    }(GL_Control));
    GL_UI.GL_ControlField = GL_ControlField;
    var GLControlChoiche = (function (_super) {
        __extends(GLControlChoiche, _super);
        function GLControlChoiche(rooNode, source, field, options, sourceChoices) {
            var _this = _super.call(this, rooNode, source, field, options) || this;
            _this._dataSourceChoices = sourceChoices;
            _this._dataSourceChoices._onChange("data").do(function (r) { return _this._refreshFromDataSourceChoiches(); });
            return _this;
        }
        GLControlChoiche.prototype._refreshFromDataSourceChoiches = function () {
            this._refreshChoicesUI();
            this._refreshUI();
        };
        return GLControlChoiche;
    }(GL_ControlField));
    GL_UI.GLControlChoiche = GLControlChoiche;
    var GLControlChoicheString = (function (_super) {
        __extends(GLControlChoicheString, _super);
        function GLControlChoicheString(rooNode, source, field, options, sourceChoices, fieldText) {
            var _this = _super.call(this, rooNode, source, field, options, sourceChoices) || this;
            _this._fieldText = fieldText;
            return _this;
        }
        return GLControlChoicheString;
    }(GLControlChoiche));
    GL_UI.GLControlChoicheString = GLControlChoicheString;
    var GLNumeric = (function (_super) {
        __extends(GLNumeric, _super);
        function GLNumeric(rooNode, source, field, options) {
            var _this = _super.call(this, rooNode, source, field, options) || this;
            _this._build();
            _this._onReadOnlyChanged();
            _this._onDirtyChanged();
            _this._refreshUI();
            return _this;
        }
        GLNumeric.prototype._onReadOnlyChanged = function () {
            this.widget.readonly(this.controlOptions.readOnly);
        };
        GLNumeric.prototype._onDirtyChanged = function () {
        };
        GLNumeric.prototype._setUIValue = function (value) {
            this.widget.value(value);
        };
        GLNumeric.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new GLControlFieldOptions());
        };
        GLNumeric.prototype._build = function () {
            var _this = this;
            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            this.widgetOptions.change = function (event) {
                _this._onUIValueChange(_this.widget.value());
            };
            this.widget = new kendo.ui.NumericTextBox(this.element, this.widgetOptions);
        };
        return GLNumeric;
    }(GL_ControlField));
    GL_UI.GLNumeric = GLNumeric;
    var GLText = (function (_super) {
        __extends(GLText, _super);
        function GLText(rooNode, source, field, options) {
            var _this = _super.call(this, rooNode, source, field, options) || this;
            _this._build();
            _this._onReadOnlyChanged();
            _this._onDirtyChanged();
            _this._refreshUI();
            return _this;
        }
        GLText.prototype._onReadOnlyChanged = function () {
            this.element.readOnly = this.controlOptions.readOnly;
        };
        GLText.prototype._onDirtyChanged = function () {
        };
        GLText.prototype._setUIValue = function (value) {
            this.widget.value = value;
        };
        GLText.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new GLControlFieldOptions());
        };
        GLText.prototype._build = function () {
            var _this = this;
            this.element = document.createElement("input");
            this.element.classList.add("k-textbox");
            this.element.style.width = "100%";
            this.widget = this.element;
            this.rootElement.appendChild(this.element);
            this.widget.addEventListener('blur', function (event) {
                _this._onUIValueChange(_this.widget.value);
            });
        };
        return GLText;
    }(GL_ControlField));
    GL_UI.GLText = GLText;
    var IGLControlOptionsTextButton = (function (_super) {
        __extends(IGLControlOptionsTextButton, _super);
        function IGLControlOptionsTextButton() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.triggerButton = false;
            return _this;
        }
        return IGLControlOptionsTextButton;
    }(GLControlFieldOptions));
    GL_UI.IGLControlOptionsTextButton = IGLControlOptionsTextButton;
    var GLTextButton = (function (_super) {
        __extends(GLTextButton, _super);
        function GLTextButton(rooNode, source, field, options) {
            var _this = _super.call(this, rooNode, source, field, options) || this;
            _this._build();
            _this._onReadOnlyChanged();
            _this._onDirtyChanged();
            _this._refreshUI();
            return _this;
        }
        GLTextButton.prototype._onReadOnlyChanged = function () {
            this.element.readOnly = this.controlOptions.readOnly;
        };
        GLTextButton.prototype._onDirtyChanged = function () {
        };
        GLTextButton.prototype._setUIValue = function (value) {
            this.widget.value = value;
        };
        GLTextButton.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new IGLControlOptionsTextButton());
        };
        GLTextButton.prototype._build = function () {
            var _this = this;
            var span = document.createElement("span");
            span.classList.add("k-textbox");
            span.classList.add("k-space-right");
            span.style.width = "100%";
            var spanButton = document.createElement("span");
            spanButton.setAttribute("role", "button");
            spanButton.addEventListener('click', function (ev) { return _this.controlOptions.triggerButton = !_this.controlOptions.triggerButton; });
            var spanIcon = document.createElement("span");
            spanIcon.classList.add("k-icon");
            spanIcon.classList.add("k-i-close");
            this.element = document.createElement("input");
            this.element.classList.add("k-textbox");
            this.element.style.width = "100%";
            this.widget = this.element;
            span.appendChild(this.element);
            span.appendChild(spanButton);
            spanButton.appendChild(spanIcon);
            this.rootElement.appendChild(span);
            this.widget.addEventListener('blur', function (event) {
                _this._onUIValueChange(_this.widget.value);
            });
        };
        return GLTextButton;
    }(GL_ControlField));
    GL_UI.GLTextButton = GLTextButton;
    var GLDatepicker = (function (_super) {
        __extends(GLDatepicker, _super);
        function GLDatepicker(rooNode, source, field, options) {
            var _this = _super.call(this, rooNode, source, field, options) || this;
            _this._build();
            _this._onReadOnlyChanged();
            _this._onDirtyChanged();
            _this._refreshUI();
            return _this;
        }
        GLDatepicker.prototype._onReadOnlyChanged = function () {
            this.widget.readonly(this.controlOptions.readOnly);
        };
        GLDatepicker.prototype._onDirtyChanged = function () {
        };
        GLDatepicker.prototype._setUIValue = function (value) {
            this.widget.value(value);
        };
        GLDatepicker.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new GLControlFieldOptions());
        };
        GLDatepicker.prototype._build = function () {
            var _this = this;
            if (!this.widgetOptions) {
                this.widgetOptions = {};
                this.widgetOptions.culture = "it-IT";
                this.widgetOptions.format = "dd/MM/yyyy";
            }
            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            this.widgetOptions.change = function (event) {
                _this._onUIValueChange(_this.widget.value());
            };
            this.widget = new kendo.ui.DatePicker(this.element, this.widgetOptions);
        };
        return GLDatepicker;
    }(GL_ControlField));
    GL_UI.GLDatepicker = GLDatepicker;
    var GLComboBox = (function (_super) {
        __extends(GLComboBox, _super);
        function GLComboBox(rooNode, source, field, options, sourceChoices, fieldText) {
            var _this = _super.call(this, rooNode, source, field, options, sourceChoices, fieldText) || this;
            _this._build();
            _this._onReadOnlyChanged();
            _this._onDirtyChanged();
            _this._refreshUI();
            return _this;
        }
        GLComboBox.prototype._onReadOnlyChanged = function () {
            this.widget.readonly(this.controlOptions.readOnly);
        };
        GLComboBox.prototype._onDirtyChanged = function () {
        };
        GLComboBox.prototype._findValue = function (value) {
            for (var _i = 0, _a = this._dataSourceChoices.data; _i < _a.length; _i++) {
                var item = _a[_i];
                if (value[this._fieldText] == item[this._fieldText]) {
                    return this._dataSourceChoices.data.indexOf(item);
                }
            }
            return -1;
        };
        GLComboBox.prototype._setUIValue = function (value) {
            if (this._dataSourceChoices.data) {
                var index = this._findValue(value);
                this.widget.select(index);
            }
        };
        GLComboBox.prototype._buildControlOptions = function () {
            return GL_Core.Data.create(new GLControlFieldOptions());
        };
        GLComboBox.prototype._build = function () {
            var _this = this;
            if (!this.widgetOptions) {
                this.widgetOptions = {};
            }
            if (!this.widgetOptions.dataSource) {
                this.widgetOptions.dataSource = new kendo.data.DataSource();
            }
            this._kdataSource = this.widgetOptions.dataSource;
            this.widgetOptions.dataTextField = this._fieldText;
            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            this.widgetOptions.change = function (event) {
                if (_this._dataSourceChoices.data) {
                    var selection = _this.widget.select();
                    _this._onUIValueChange(_this._dataSourceChoices.data[selection]);
                }
            };
            this.widget = new kendo.ui.ComboBox(this.element, this.widgetOptions);
        };
        GLComboBox.prototype._refreshFromDataSourceChoiches = function () {
            this._refreshChoicesUI();
        };
        GLComboBox.prototype._refreshChoicesUI = function () {
            if (this._dataSourceChoices) {
                this._kdataSource.data(this._dataSourceChoices.data);
                this._kdataSource.query();
                if (this.dataSource.data)
                    this._setUIValue(this.dataSource.data[this.controlOptions.field]);
            }
        };
        return GLComboBox;
    }(GLControlChoicheString));
    GL_UI.GLComboBox = GLComboBox;
})(GL_UI || (GL_UI = {}));
//# sourceMappingURL=gl_ui.js.map