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
var GL_Core;
(function (GL_Core) {
    var Event = (function () {
        function Event() {
            this._listeners = [];
        }
        Event.prototype.do = function (call) {
            this._listeners.push(call);
        };
        Event.prototype.undo = function (call) {
            var index = this._listeners.indexOf(call);
            if (index > -1) {
                this._listeners.splice(index, 1);
            }
        };
        Event.prototype.fire = function (event) {
            var toNotify = this._listeners.slice();
            for (var _i = 0, toNotify_1 = toNotify; _i < toNotify_1.length; _i++) {
                var l = toNotify_1[_i];
                l(event);
            }
        };
        return Event;
    }());
    GL_Core.Event = Event;
    var Processor = (function () {
        function Processor() {
            this._listeners = [];
        }
        Processor.prototype.do = function (call) {
            this._listeners.push(call);
        };
        Processor.prototype.fire = function (event) {
            var ret = [];
            for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
                var l = _a[_i];
                ret.push(l(event));
            }
            return ret;
        };
        Processor.prototype.fireSingle = function (event) {
            var ret = [];
            for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
                var l = _a[_i];
                ret.push(l(event));
            }
            return ret[ret.length - 1];
        };
        return Processor;
    }());
    GL_Core.Processor = Processor;
    var Converter = (function () {
        function Converter(fromTo, toFrom) {
            this._fromTo = fromTo;
            this._toFrom = toFrom;
        }
        Converter.prototype.do = function (fromTo, toFrom) {
            this._fromTo = fromTo;
            this._toFrom = toFrom;
        };
        Converter.prototype.convertFromTo = function (event) {
            return this._fromTo(event);
        };
        Converter.prototype.convertToFrom = function (event) {
            return this._toFrom(event);
        };
        return Converter;
    }());
    GL_Core.Converter = Converter;
    var GL_Server = (function () {
        function GL_Server() {
            this._host = "http://localhost:8090/Jersey-Spring-Hibernate";
            this._linkMODELALL = new GL_Link();
            this._linkMODELALL._method = GL_Link.MODE_GET;
            this._linkMODELALL._type = GL_Link.TYPE_ARRAY;
            this._linkMODELALL._class = "JPA_GLModel";
            this._linkMODELALL._href = "/rest/model";
            this._linkMODEL = new GL_Link();
            this._linkMODEL._method = GL_Link.MODE_GET;
            this._linkMODEL._type = GL_Link.TYPE_SINGLE;
            this._linkMODEL._class = "JPA_GLModel";
            this._linkMODEL._href = "/rest/model/{clazz}";
            var classParam = new GL_Link_Param();
            classParam._name = "{clazz}";
            classParam._value = "app.model.Book";
            this._linkMODEL._params = [classParam];
        }
        return GL_Server;
    }());
    GL_Core.GL_Server = GL_Server;
    var GL_Response = (function () {
        function GL_Response() {
        }
        return GL_Response;
    }());
    GL_Core.GL_Response = GL_Response;
    var GL_Result = (function () {
        function GL_Result() {
        }
        return GL_Result;
    }());
    GL_Core.GL_Result = GL_Result;
    var EventDataFieldChange = (function () {
        function EventDataFieldChange(source, field, oldValue, newValue) {
            this.source = source;
            this.field = field;
            this.newValue = newValue;
            this.oldValue = oldValue;
        }
        return EventDataFieldChange;
    }());
    GL_Core.EventDataFieldChange = EventDataFieldChange;
    var Data = (function () {
        function Data() {
            this._values = {};
            this._eventsOnChange = {};
        }
        Data.prototype._onChange = function (field) {
            if (!this._eventsOnChange[field])
                throw Error("No event found for " + field);
            return this._eventsOnChange[field];
        };
        Data.prototype._proto = function () {
            return this._values;
        };
        Data.create = function (proto) {
            var ret = new Data();
            for (var att in proto) {
                if (att.charAt(0) == '_')
                    continue;
                if (typeof proto[att] == "function")
                    continue;
                if (att == "constructor")
                    continue;
                if (proto[att] instanceof Array) {
                    ret._createArray(att);
                    var arr = ret._values[att];
                    for (var _i = 0, _a = proto[att]; _i < _a.length; _i++) {
                        var ele = _a[_i];
                        arr.push(ele);
                    }
                }
                else {
                    ret._createField(att);
                    ret._values[att] = proto[att];
                }
            }
            return ret;
        };
        Data.prototype._getValue = function (field) {
            this._checkField(field);
            return this._values[field];
        };
        Data.prototype._setValue = function (field, value) {
            if (value == this._values[field])
                return;
            this._checkField(field);
            this._checkValue(field, value);
            var event = new EventDataFieldChange(this, field, this._values[field], value);
            this._values[field] = value;
            this._eventsOnChange[field].fire(event);
        };
        Data.prototype._checkValue = function (field, value) {
        };
        Data.prototype._checkField = function (field) {
        };
        Data.prototype._exists = function (field) {
            if (this._eventsOnChange[field]) {
                return true;
            }
            return false;
        };
        Data.prototype._createField = function (attribute) {
            var _this = this;
            var propertyDescriptor = {};
            propertyDescriptor.get = function () {
                return _this._getValue(attribute);
            };
            propertyDescriptor.set = function (value) {
                _this._setValue(attribute, value);
            };
            propertyDescriptor.enumerable = true;
            this._values[attribute] = null;
            this._eventsOnChange[attribute] = new GL_Core.Event();
            Object.defineProperty(this, attribute, propertyDescriptor);
        };
        Data.prototype._createArray = function (attribute) {
            var _this = this;
            var propertyDescriptor = {};
            propertyDescriptor.get = function () {
                return _this._getValue(attribute);
            };
            propertyDescriptor.set = function (value) {
                _this._setValue(attribute, value);
            };
            propertyDescriptor.enumerable = true;
            this._values[attribute] = new GL_Array();
            this._eventsOnChange[attribute] = new GL_Core.Event();
            Object.defineProperty(this, attribute, propertyDescriptor);
        };
        return Data;
    }());
    GL_Core.Data = Data;
    var GL_Array = (function (_super) {
        __extends(GL_Array, _super);
        function GL_Array() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._eventsOnChange = new GL_Core.Event();
            _this._eventsOnAdd = new GL_Core.Event();
            _this._eventsOnRemove = new GL_Core.Event();
            return _this;
        }
        GL_Array.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var itemsToAdd = [];
            for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
                var i = items_1[_a];
                if ((i instanceof Object) && !(i instanceof Data)) {
                    var toAdd = Data.create(i);
                    itemsToAdd.push(toAdd);
                }
                else {
                    itemsToAdd.push(i);
                }
            }
            var ret = 0;
            for (var _b = 0, itemsToAdd_1 = itemsToAdd; _b < itemsToAdd_1.length; _b++) {
                var i = itemsToAdd_1[_b];
                ret = _super.prototype.push.call(this, i);
                this._eventsOnAdd.fire(this);
                this._eventsOnChange.fire(this);
            }
            return ret;
        };
        return GL_Array;
    }(Array));
    GL_Core.GL_Array = GL_Array;
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._resolved = {};
            return _this;
        }
        Object.defineProperty(Entity.prototype, "_id", {
            get: function () {
                return this._values[this._model._id];
            },
            enumerable: true,
            configurable: true
        });
        Entity.create = function (model, values) {
            var ret = new Entity();
            ret._model = model;
            for (var _i = 0, _a = model._attributes; _i < _a.length; _i++) {
                var att = _a[_i];
                ret._createAttribute(att);
            }
            if (values) {
                for (var _b = 0, _c = model._attributes; _b < _c.length; _b++) {
                    var att = _c[_b];
                    ret._values[att._name] = values[att._name];
                }
            }
            return ret;
        };
        Entity.prototype._createAttribute = function (attribute) {
            if (this._values[attribute._name])
                throw new Error("Attribute already exists : " + attribute._name);
            if (!attribute._isCollection) {
                if (attribute._isEntity) {
                    this._createField(attribute._name);
                    this._resolved[attribute._name] = false;
                }
                else {
                    this._createField(attribute._name);
                    this._resolved[attribute._name] = true;
                }
            }
            else {
                if (attribute._isEntity) {
                    this._createArray(attribute._name);
                    this._resolved[attribute._name] = true;
                }
                else {
                    this._createArray(attribute._name);
                    this._resolved[attribute._name] = false;
                }
            }
        };
        Entity.prototype._checkField = function (field) {
            if (this._resolved[field] == false)
                throw new Error("Field not resolved : " + field);
        };
        Entity.prototype._resolve = function (field, value) {
            if (this._values[field] instanceof GL_Array) {
                var arr = this._values[field];
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var ele = value_1[_i];
                    arr.push(ele);
                }
            }
            else {
                this._values[field] = value;
            }
            this._resolved[field] = true;
        };
        return Entity;
    }(Data));
    GL_Core.Entity = Entity;
    var ViewElement = (function () {
        function ViewElement(parent, field) {
            this._childs = [];
            this._parent = parent;
            this._field = field;
        }
        ViewElement.prototype.getChild = function (field) {
            var filtered = this._childs.filter(function (f) { return f._field == field; });
            var ret = null;
            if (filtered.length == 0) {
                var child = new ViewElement(this, field);
                this._childs.push(child);
                ret = child;
            }
            else {
                ret = filtered[0];
            }
            return ret;
        };
        return ViewElement;
    }());
    GL_Core.ViewElement = ViewElement;
    var EventDataView = (function () {
        function EventDataView(source, alias) {
            this.source = source;
            this.alias = alias;
        }
        return EventDataView;
    }());
    GL_Core.EventDataView = EventDataView;
    var DataView = (function (_super) {
        __extends(DataView, _super);
        function DataView(controller) {
            var _this = _super.call(this) || this;
            _this._bindentity = [];
            _this._eventSomethingChanges = function () { return _this.refreshFromOutside(); };
            _this._controller = controller;
            var _loop_1 = function (path) {
                this_1._createField(path._alias);
                this_1._eventsOnChange[path._alias].do(function (ev) { _this.writeValue(path._alias); });
            };
            var this_1 = this;
            for (var _i = 0, _a = _this._controller._a_paths; _i < _a.length; _i++) {
                var path = _a[_i];
                _loop_1(path);
            }
            return _this;
        }
        DataView.prototype.writeValue = function (alias) {
            this._controller._d_paths[alias].setValue(this, this[alias]);
        };
        DataView.prototype.refreshValues = function () {
            for (var _i = 0, _a = this._controller._a_paths; _i < _a.length; _i++) {
                var path = _a[_i];
                this[path._alias] = path.getValue(this);
            }
        };
        DataView.prototype.refreshFromOutside = function () {
            this.bind(this._data);
            this.refreshValues();
        };
        DataView.prototype.unbind = function () {
            if (!this._data)
                return;
            for (var _i = 0, _a = this._bindentity; _i < _a.length; _i++) {
                var b = _a[_i];
                b.bind._onChange(b.field).undo(this._eventSomethingChanges);
            }
            this._bindentity = [];
        };
        DataView.prototype.bind = function (data) {
            this.unbind();
            this._data = data;
            for (var _i = 0, _a = this._controller._a_paths; _i < _a.length; _i++) {
                var path = _a[_i];
                for (var _b = 0, _c = path.getValueChain(this); _b < _c.length; _b++) {
                    var obj = _c[_b];
                    if (obj.bind instanceof GL_Core.Data) {
                        obj.bind._onChange(obj.field).do(this._eventSomethingChanges);
                        this._bindentity.push(obj);
                    }
                }
            }
            this.refreshValues();
        };
        return DataView;
    }(GL_Core.Data));
    GL_Core.DataView = DataView;
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super.call(this, null, null) || this;
            _this._d_paths = {};
            _this._a_paths = [];
            return _this;
        }
        Object.defineProperty(View.prototype, "paths", {
            get: function () {
                return this._a_paths;
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.createPath = function (alias, path) {
            var ret = this._d_paths[alias];
            if (ret)
                throw new Error("Alias aready defined: " + alias);
            var elements = [];
            var pathElements = path.split(".");
            var curr = this;
            for (var _i = 0, pathElements_1 = pathElements; _i < pathElements_1.length; _i++) {
                var field = pathElements_1[_i];
                var child = curr.getChild(field);
                curr = child;
                elements.push(curr);
            }
            ret = new DataPath(alias, path, this, elements);
            this._d_paths[alias] = ret;
            this._a_paths.push(ret);
            return ret;
        };
        View.prototype.getPath = function (alias) {
            var ret = this._d_paths[alias];
            if (!ret)
                throw new Error("Alias not found into " + this);
            return ret;
        };
        View.prototype.createViewSingle = function (data) {
            var ret = new DataView(this);
            ret.bind(data);
            return ret;
        };
        View.prototype.createViewArray = function (dataList) {
            var ret = new GL_Core.GL_Array();
            for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
                var d = dataList_1[_i];
                ret.push(this.createViewSingle(d));
            }
            return ret;
        };
        return View;
    }(ViewElement));
    GL_Core.View = View;
    var DataPath = (function () {
        function DataPath(alias, field, controller, elements) {
            this._elements = [];
            this.onConvert = new GL_Core.Converter(function (f) { return f; }, function (f) { return f; });
            this.onGetValueAsString = new GL_Core.Processor();
            this._alias = alias;
            this._field = field;
            this._controller = controller;
            this._elements = elements;
        }
        DataPath.prototype.getValueChain = function (proxy) {
            var ret = [];
            var cur = proxy._data;
            for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
                var c = _a[_i];
                if (cur == null)
                    break;
                var toPush = { bind: cur, field: c._field };
                ret.push(toPush);
                cur = cur[c._field];
            }
            return ret;
        };
        DataPath.prototype.getValueRaw = function (proxy) {
            var cur = proxy._data;
            for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
                var c = _a[_i];
                if (cur == null)
                    return null;
                cur = cur[c._field];
            }
            return cur;
        };
        DataPath.prototype.setValueRaw = function (proxy, value) {
            var last = this._elements[this._elements.length - 1];
            var toSet = proxy._data;
            for (var i = 0; i < this._elements.length - 1; i++) {
                toSet = toSet[this._elements[i]._field];
                if (toSet == null)
                    throw Error("Cannot set null value for field " + this._elements[i]._field);
            }
            toSet[last._field] = value;
        };
        DataPath.prototype.getValue = function (proxy) {
            var cur = this.getValueRaw(proxy);
            return this.onConvert.convertFromTo(cur);
        };
        DataPath.prototype.setValue = function (proxy, value) {
            var cur = this.onConvert.convertToFrom(value);
            this.setValueRaw(proxy, cur);
        };
        DataPath.prototype.getValueAsString = function (proxy) {
            return this.onGetValueAsString.fireSingle(this.getValue(proxy));
        };
        return DataPath;
    }());
    GL_Core.DataPath = DataPath;
    var GL_Model = (function () {
        function GL_Model() {
        }
        return GL_Model;
    }());
    GL_Core.GL_Model = GL_Model;
    var GL_Model_Attribute = (function () {
        function GL_Model_Attribute() {
        }
        return GL_Model_Attribute;
    }());
    GL_Core.GL_Model_Attribute = GL_Model_Attribute;
    var GL_Link_Param = (function () {
        function GL_Link_Param() {
        }
        return GL_Link_Param;
    }());
    GL_Core.GL_Link_Param = GL_Link_Param;
    var GL_Link = (function () {
        function GL_Link() {
            this._params = [];
        }
        return GL_Link;
    }());
    GL_Link.MODE_GET = "GET";
    GL_Link.MODE_POST = "POST";
    GL_Link.MODE_PUT = "PUT";
    GL_Link.MODE_DELETE = "DELETE";
    GL_Link.TYPE_SINGLE = "SINGLE";
    GL_Link.TYPE_ARRAY = "ARRAY";
    GL_Core.GL_Link = GL_Link;
    var GL_Service = (function () {
        function GL_Service() {
            this._models = {};
            this._modelsArray = [];
        }
        GL_Service.prototype.init = function (models) {
            for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
                var model = models_1[_i];
                this._models[model._class] = model;
                this._modelsArray.push(model);
                model.attributes = {};
                for (var _a = 0, _b = model._attributes; _a < _b.length; _a++) {
                    var attribute = _b[_a];
                    attribute.model = model;
                    model.attributes[attribute._name] = attribute;
                }
            }
            for (var _c = 0, models_2 = models; _c < models_2.length; _c++) {
                var model = models_2[_c];
                model._linkGETALL.model = model;
                model._linkGET.model = model;
                model._linkPOST.model = model;
                model._linkPUT.model = model;
                model._linkDELETE.model = model;
                for (var _d = 0, _e = model._attributes; _d < _e.length; _d++) {
                    var attribute = _e[_d];
                    if (attribute._isAssociation) {
                        attribute.modelTarget = this._models[attribute._class];
                        attribute._linkGET.model = this._models[attribute._class];
                        attribute._linkPOST.model = this._models[attribute._class];
                        attribute._linkDELETE.model = this._models[attribute._class];
                    }
                }
            }
        };
        GL_Service.prototype.doInit = function () {
            var _this = this;
            var params = [];
            return GL_Core.doExecute(GL_Core.SERVER, GL_Core.SERVER._linkMODELALL, params, null).then(function (values) {
                _this.init(values);
                return values;
            });
        };
        GL_Service.prototype.doGet = function (model, id) {
            var params = [{ _name: "{id}", _value: id }];
            return GL_Core.doExecute(GL_Core.SERVER, model._linkGET, params, null).then(function (values) {
                return GL_Core.Entity.create(model, values);
            });
        };
        GL_Service.prototype.doGetAll = function (model) {
            var params = [];
            return GL_Core.doExecute(GL_Core.SERVER, model._linkGETALL, params, null).then(function (values) {
                var ret = new GL_Array();
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var o = values_1[_i];
                    var toAdd = GL_Core.Entity.create(model, o);
                    ret.push(toAdd);
                }
                return ret;
            });
        };
        GL_Service.prototype.doResolve = function (data, field) {
            if (!data._model.attributes[field])
                throw new Error("Field not defined to be resolved:" + field);
            if (!this._models[data._model.attributes[field]._class])
                throw new Error("Model not defined to be resolved:" + field);
            var id = data[data._model._id];
            var collection = data._model.attributes[field]._isCollection;
            var targetModel = this._models[data._model.attributes[field]._class];
            var params = [{ _name: "{id}", _value: id }];
            return GL_Core.doExecute(GL_Core.SERVER, data._model.attributes[field]._linkGET, params, null).then(function (values) {
                if (!collection) {
                    data._resolve(field, GL_Core.Entity.create(targetModel, values));
                }
                else {
                    for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                        var o = values_2[_i];
                        var ret = new GL_Array();
                        var toAdd = GL_Core.Entity.create(targetModel, values);
                        ret.push(toAdd);
                    }
                    data._resolve(field, ret);
                }
                return data;
            });
        };
        return GL_Service;
    }());
    GL_Core.GL_Service = GL_Service;
    function getURL(server, link, params) {
        var url = server._host + link._href;
        if (params) {
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var param = params_1[_i];
                console.debug("Inject parameters", param);
                url = url.replace(param._name, param._value);
            }
        }
        return url;
    }
    GL_Core.getURL = getURL;
    function doExecute(server, link, params, data) {
        console.debug("doExecute : create ", link);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: getURL(server, link, params),
                type: link._method,
                data: data
            }).then(function (cs) {
                var response = cs;
                console.debug("doExecute : resolved ", link);
                if (!cs) {
                    console.error("doExecute : no response from server", server);
                    reject(new Error("Ajax no response from server " + server._host));
                }
                else if (response._error) {
                    console.error("doExecute : internal server error", response);
                    reject(new Error(response._error_message + "->" + response._error_stackTrace));
                }
                else {
                    console.debug("doExecute : data ", response);
                    resolve(response._result._data);
                }
            }, function (data, status, error) {
                console.error("doExecute : error", error);
                reject(new Error(status + " -> " + error));
            });
        });
    }
    GL_Core.doExecute = doExecute;
    GL_Core.SERVER = new GL_Server();
    GL_Core.SERVICE = new GL_Service();
})(GL_Core || (GL_Core = {}));
//# sourceMappingURL=gl_core.js.map