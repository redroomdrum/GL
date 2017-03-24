/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/bluebird/bluebird-2.0.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/log4javascript/log4javascript.d.ts"/>



module GL_Core {

  let log = new log4javascript.Logger();

  export interface IEventArgs{

  }

 export interface ICallBackProcess<T,K> {
       (data : T) : K;
  }

  export interface ICallBackConsume<T> {
       (data : T) : any;
  }

  export class Event<T extends IEventArgs> {

      protected _listeners : ICallBackConsume<T>[] = [];

      public do(call : ICallBackConsume<T>){
          this._listeners.push(call);
      }

      public undo(call : ICallBackConsume<T>){
          let index = this._listeners.indexOf(call);
          if (index > -1){
            this._listeners.splice(index, 1);
          }
      }


     public fire(event : T){
         // make a copy to be sure during event propagation that
         // all the elements has been updated even if _listeners
         // changes
          let toNotify = this._listeners.slice();

          for (let l of toNotify){
              l(event);
          }
      }
  }

  export class Processor<T extends IEventArgs, TYPE> {

      protected _listeners : ICallBackProcess<T, TYPE>[] = [];

      public do(call : ICallBackConsume<T>){
          this._listeners.push(call);
      }

     public fire(event : T) : TYPE []{
          let ret : TYPE[] = [];
          for (let l of this._listeners){
              ret.push(l(event));
          }
          return ret;
      }

       public fireSingle(event : T) : TYPE{
          let ret : TYPE[] = [];
          for (let l of this._listeners){
              ret.push(l(event));
          }
          return ret[ret.length-1];
      }
  }

   export class Converter<FROM, TO> {

      protected _fromTo : ICallBackProcess<FROM, TO>;
      protected _toFrom : ICallBackProcess<TO, FROM>;
      
      constructor(fromTo : ICallBackProcess<FROM, TO>, toFrom : ICallBackProcess<TO, FROM>){
        this._fromTo = fromTo;
        this._toFrom = toFrom;
      }

      public do(fromTo : ICallBackProcess<FROM, TO>, toFrom : ICallBackProcess<TO, FROM>){
          this._fromTo = fromTo;
           this._toFrom = toFrom;
      }

      public convertFromTo(event : FROM) : TO{
          return this._fromTo(event);
      }

       public convertToFrom(event : TO) : FROM{
           return this._toFrom(event);
      }
      
  }

 

  export class GL_Server
   {
       _host: string = "http://localhost:8090/Jersey-Spring-Hibernate";
       _linkMODEL     : GL_Link<GL_Model>;
       _linkMODELALL  : GL_Link<GL_Model[]>;

       constructor(){
           this._linkMODELALL = new GL_Link<GL_Model[]>();
           this._linkMODELALL._method = GL_Link.MODE_GET
           this._linkMODELALL._type = GL_Link.TYPE_ARRAY;
           this._linkMODELALL._class = "JPA_GLModel";
           this._linkMODELALL._href = "/rest/model";

           this._linkMODEL = new GL_Link<GL_Model>();
           this._linkMODEL._method = GL_Link.MODE_GET
           this._linkMODEL._type = GL_Link.TYPE_SINGLE;
           this._linkMODEL._class = "JPA_GLModel";
           this._linkMODEL._href = "/rest/model/{clazz}";

           var classParam = new GL_Link_Param();
           classParam._name = "{clazz}";
           classParam._value = "app.model.Book";

           this._linkMODEL._params = [classParam];
       }
   }

  export  class GL_Response<T>
   {
     _error : string;
     _error_message : string;
     _error_stackTrace : string;
     _result : GL_Result<T>;
   }

  export   class GL_Result<T>
   {
     _type : string;
     _class : string;
     _data : T;
     _error : string;
     _error_message : string;
     _error_stackTrace : string;
   }


    export class EventDataFieldChange implements GL_Core.IEventArgs{
        public source : Data;
        public field : string;
        public oldValue : any;
        public newValue : any;
        
        constructor( source : Data,field : string,oldValue : any, newValue : any){
            this.source = source;
            this.field = field;
            this.newValue = newValue;
            this.oldValue = oldValue;
        }
    }

    export class Data {

        public _values : { [attr: string]: any; } = { };
        protected _eventsOnChange : { [attr: string]: GL_Core.Event<EventDataFieldChange>; } = { };

        constructor(){
            
        }

        public _onChange(field : string) : GL_Core.Event<EventDataFieldChange>{
            if (!this._eventsOnChange[field])
                throw  Error("No event found for " + field);
            
            return this._eventsOnChange[field];
        }

        public _proto() : Object{
            return this._values;
        }


        public static create(proto :Object) : Data{
            let ret = new Data();

            for (let att in proto){

                if (att.charAt(0) == '_')
                    continue;

                if (typeof proto[att] == "function")
                    continue;

                if (att == "constructor")
                    continue;

                if (proto[att] instanceof Array){
                    ret._createArray(att);
                    let arr = <GL_Array<any>> ret._values[att];
                    for (let ele of proto[att])
                        arr.push(ele);
                }else {
                    ret._createField(att);
                    ret._values[att] = proto[att];
                }
            }
          

            return ret;
        }


        public  _getValue(field : string): any{
            this._checkField(field);
            return this._values[field];
        }


        public _setValue(field : string , value : any): void{
            
            if (value == this._values[field])
                return;

            this._checkField(field);
            this._checkValue(field, value);
            
            let event = new EventDataFieldChange(this, field, this._values[field], value);
            this._values[field] = value;
            this._eventsOnChange[field].fire(event);
        }

        
        public _checkValue(field : string, value:any){
            
        }

        public _checkField(field : string){
            
        }


        public _exists(field : string) : boolean{
           if( this._eventsOnChange[field]){
                return true;
           }
           return false;
        }

        public _createField(attribute : string) {

            let propertyDescriptor: PropertyDescriptor = {};
            propertyDescriptor.get = () : any => { 
                return this._getValue(attribute);
            };

            propertyDescriptor.set = (value): void  => {
                this._setValue(attribute, value);
            };
            propertyDescriptor.enumerable = true;

            this._values[attribute] = null;
            this._eventsOnChange[attribute] = new GL_Core.Event();

            Object.defineProperty(this, attribute, propertyDescriptor);
        }


        public _createArray(attribute : string) {

            let propertyDescriptor: PropertyDescriptor = {};
            propertyDescriptor.get = () : any => { 
                return this._getValue(attribute);
            };
             propertyDescriptor.set = (value): void  => {
                this._setValue(attribute, value);
            };

            propertyDescriptor.enumerable = true;

            this._values[attribute] = new GL_Array();
            this._eventsOnChange[attribute] = new GL_Core.Event();
            Object.defineProperty(this, attribute, propertyDescriptor);
        }

     }

    export class GL_Array<T> extends Array<T> implements GL_Core.IEventArgs {

        public _eventsOnChange : GL_Core.Event<GL_Array<T>> = new  GL_Core.Event<GL_Array<T>>();
        public _eventsOnAdd :  GL_Core.Event<GL_Array<T>> = new  GL_Core.Event<GL_Array<T>>();
        public _eventsOnRemove : GL_Core.Event<GL_Array<T>> = new  GL_Core.Event<GL_Array<T>>();

        push(...items: T[]): number{

            let itemsToAdd = [];
            for (let i of items){
                if ( (i instanceof Object) && !(i instanceof Data)){
                    let toAdd =  Data.create(i);
                    itemsToAdd.push(toAdd);
                }else {
                    itemsToAdd.push(i);
                }
            }

            let ret : number = 0;
            for (let i of itemsToAdd){
                ret = super.push(i);
                this._eventsOnAdd.fire(this);
                this._eventsOnChange.fire(this);
            }

            return ret;

        }

    }

    export class Entity extends Data{
         public _model : GL_Model;
         public _resolved : { [attr: string]: boolean; } = { };

         public get _id(){
             return this._values[this._model._id];
         }


         public static create(model : GL_Core.GL_Model, values ?:Object) : Entity{
            let ret = new Entity();
            ret._model = model;
            for (let att of model._attributes){
                ret._createAttribute(att);
            }

            if (values){
                for (let att of model._attributes){
                   ret._values[att._name] = values[att._name];
                }
            }

            return ret;
        }


        protected _createAttribute( attribute : GL_Core.GL_Model_Attribute) {
            if (this._values[attribute._name])
                throw new Error ("Attribute already exists : " + attribute._name);
            
            if (!attribute._isCollection){
                if (attribute._isEntity){
                    this._createField(attribute._name);
                    this._resolved[attribute._name] = false;
                }else {
                    this._createField(attribute._name);
                    this._resolved[attribute._name] = true;
                }
            }else {
                  if (attribute._isEntity){
                    this._createArray(attribute._name);
                    this._resolved[attribute._name] = true;
                }else {
                    this._createArray(attribute._name);
                    this._resolved[attribute._name] = false;
                }
            }
        }

        public _checkField(field : string){
            if (this._resolved[field] == false) 
                throw new Error("Field not resolved : " + field);
        }

        public _resolve(field : string, value :any){
            if (this._values[field] instanceof GL_Array){
                let arr = this._values[field];
                for (let ele of value)
                    arr.push(ele);
            }else {
                this._values[field] = value;
            }
            this._resolved[field] = true;
        }

    }


       export class ViewElement<T> implements GL_Core.IEventArgs{
            public _parent : ViewElement<T>;
            public _field  : string;
            public _childs : ViewElement<T>[] = [];

            public getChild(field:string) : ViewElement<T>{
                let filtered = this._childs.filter( f=> {return f._field == field});
                
                let ret : ViewElement<T>  = null;
                if (filtered.length == 0){
                     let child = new ViewElement(this, field);
                     this._childs.push(child);
                     ret = child;
                } else {
                     ret = filtered[0];
                }
                return ret;
            }


            constructor (parent : ViewElement<T>, field : string){
                this._parent = parent;
                this._field = field;
            }
      }

       export class EventDataView<T, TYPE>{
           public source : DataView<T>;
           public alias : string;
           
           constructor (source : DataView<T>, alias : string){
               this.source = source;
               this.alias = alias;
           }
       } 

       export class DataView<T> extends GL_Core.Data implements GL_Core.IEventArgs{
           public _controller : View<T>;
           public _data : T;
           public _bindentity : { bind: GL_Core.Data, field:string} [] = [];
           public _eventSomethingChanges : (any) => void = () => this.refreshFromOutside();

           constructor(controller : View<T>){
               super();
               this._controller = controller;
               for (let path of this._controller._a_paths){
                   this._createField(path._alias);
                   this._eventsOnChange[path._alias].do( ev => {this.writeValue(path._alias)} )
               }
           }

           public writeValue(alias:string){
               this._controller._d_paths[alias].setValue(this, this[alias]);
           }

           public refreshValues(){
               for (let path of this._controller._a_paths){
                    this[path._alias] = path.getValue(this);
               }
           }

           public refreshFromOutside(){
               this.bind(this._data);
               this.refreshValues();
           }

           protected unbind() : void{
               if (!this._data)
                    return;

                for (let b of this._bindentity){
                    b.bind._onChange(b.field).undo(this._eventSomethingChanges);
                }
                this._bindentity = [];
           } 

           public bind(data: T) : void{
                
                this.unbind();

                this._data = data;
                for (let path of this._controller._a_paths){
                    for (let obj of path.getValueChain(this)){
                        if (obj.bind instanceof GL_Core.Data){
                            obj.bind._onChange(obj.field).do(this._eventSomethingChanges);
                            this._bindentity.push(obj);
                        }
                    }
                }

                this.refreshValues();

           }
       }


      export class View<T> extends ViewElement<T> implements GL_Core.IEventArgs{
            public   _d_paths : { [alias: string]: DataPath<T,any>; } = { };
            public   _a_paths :  DataPath<T,any> [] = [];

            constructor(){
                super(null, null);
            }

            get paths() : DataPath<T,any>[]{
                return this._a_paths;
            }


           public createPath<TYPE>(alias : string, path :string) : DataPath<T, TYPE>{

                let ret = this._d_paths[alias];

                if (ret)
                    throw new Error("Alias aready defined: " + alias);

                let elements : ViewElement<T>[] = [];
                let pathElements = path.split(".");
                let curr: ViewElement<T> = this;
                for (let field of pathElements){
                    let child = curr.getChild(field);
                    curr = child;
                    elements.push(curr);
                }
                ret = new DataPath<T,TYPE>(alias, path, this, elements);
                this._d_paths[alias] = ret;
                this._a_paths.push(ret);
               
                return ret;
            }

            public getPath<TYPE>(alias :string) : DataPath<T, TYPE>{

                let ret = this._d_paths[alias];

                if (!ret)
                    throw new Error("Alias not found into " + this);
       
                return ret;
            }

            public createViewSingle(data : T) : DataView<T>{
                let ret : DataView<T> = new DataView<T>(this);
                ret.bind(data);
                return ret;
            }

            public createViewArray(dataList: T[]) : GL_Core.GL_Array<DataView<T>>{
                let ret : GL_Core.GL_Array<DataView<T>> = new GL_Core.GL_Array<DataView<T>>();
                for (let d of dataList){
                    ret.push(this.createViewSingle(d));
                }
                return ret;
            }
      }

       export class DataPath<T, TYPE> implements GL_Core.IEventArgs{

        public _alias : string;
        public _field: string;
        public _controller  : View<T>;
        public _elements: ViewElement<T>[] = [];

        public onConvert               : GL_Core.Converter<TYPE, TYPE>    = new  GL_Core.Converter<TYPE, TYPE>(f => {return f}, f => {return f});
        public onGetValueAsString      : GL_Core.Processor<TYPE, string>  = new  GL_Core.Processor<TYPE, string>();
           

        constructor (alias: string, field:string, controller : View<T>, elements : ViewElement<T>[]){
            this._alias = alias;
            this._field = field;
            this._controller = controller;
            this._elements = elements;
        }

        public getValueChain(proxy:DataView<T>):  { bind: GL_Core.Data, field:string}[]{
            let ret = [];
            
            let cur : any = proxy._data;
            for (let c of this._elements){
                if (cur == null)
                    break;
                
                let toPush = {bind:cur, field:c._field};
                ret.push(toPush);

                cur = cur[c._field];
            }

            return ret;
        }

        public getValueRaw(proxy : DataView<T>) : TYPE{
            let cur : any = proxy._data;
            for (let c of this._elements){
                if (cur == null)
                    return null;
                cur = cur[c._field];
            }
            return cur;
        }

        public setValueRaw(proxy : DataView<T>, value:TYPE){

            let last = this._elements[this._elements.length - 1];
            let toSet = proxy._data;
            for (let i = 0; i < this._elements.length -1 ; i++){
                toSet = toSet[this._elements[i]._field];
                if (toSet == null)
                throw Error("Cannot set null value for field " + this._elements[i]._field);
            }

            toSet[last._field] = value;
        }

        public getValue(proxy : DataView<T>) : TYPE{
            let cur : TYPE = this.getValueRaw(proxy);
            return this.onConvert.convertFromTo(cur);
        }

        public setValue(proxy : DataView<T>, value:TYPE){
            let cur : TYPE = this.onConvert.convertToFrom(value);
            this.setValueRaw(proxy, cur);
        }

        public getValueAsString(proxy : DataView<T>) : string {
            return this.onGetValueAsString.fireSingle(this.getValue(proxy));
        }

     }

 

  export  class GL_Model
   {
     _class : string;
     _id : string;
     _attributes : GL_Model_Attribute[];
     _linkGETALL : GL_Link<Data>;
     _linkGET : GL_Link<Data>;
     _linkPOST : GL_Link<Data>;
     _linkPUT : GL_Link<Data>;
     _linkDELETE : GL_Link<Data>;

     model : GL_Model;
     attributes : { [clazz: string]: GL_Model_Attribute};
   }

   export class GL_Model_Attribute
   {
     _name : string;
     _class : string;
     _isId : boolean;
     _isEntity : boolean;
     _isAssociation : boolean;
     _isCollection : boolean;
     _isComponent : boolean;
     _linkGET : GL_Link<Data>;
     _linkPOST : GL_Link<Data>;
     _linkDELETE : GL_Link<Data>;

      model : GL_Model;
      modelTarget  : GL_Model;
   }


   export class GL_Link_Param{
      _name : string;
      _value : string;
   }

   export  class GL_Link<T>{

       static MODE_GET = "GET";
       static MODE_POST = "POST";
       static MODE_PUT = "PUT";
       static MODE_DELETE = "DELETE";

       static TYPE_SINGLE = "SINGLE";
       static TYPE_ARRAY = "ARRAY";

      _method : string;
      _type : string;
      _class : string;
      _params : GL_Link_Param[] = [];
      _href : string;

      model : GL_Model;

   }

   /**********************************************************************************************
   ***********************************************************************************************/


   export class GL_Service{

          _models : { [clazz: string]: GL_Model; } = { };
          _modelsArray : GL_Model[] = [];

          protected init(models : GL_Model[]){
            for (let model of models){
                this._models[model._class] = model;
                this._modelsArray.push(model);
                model.attributes = {};
                for (let attribute of model._attributes){
                    attribute.model = model;
                    model.attributes[attribute._name] = attribute;
                }
            }

            for (let model of models){

                model._linkGETALL.model = model;
                model._linkGET.model = model;
                model._linkPOST.model = model;
                model._linkPUT.model = model;
                model._linkDELETE.model = model;

                for (let attribute of model._attributes){
                    if (attribute._isAssociation){
                        attribute.modelTarget = this._models[attribute._class];
                        attribute._linkGET.model = this._models[attribute._class];
                        attribute._linkPOST.model = this._models[attribute._class];
                        attribute._linkDELETE.model = this._models[attribute._class];
                    }
                }
            }
        }

        public doInit() : Promise<GL_Model[]>{
            let params = [];
            return GL_Core.doExecute<any[]>(GL_Core.SERVER, GL_Core.SERVER._linkMODELALL, params, null).then<GL_Model[]>(
                values => {
                    this.init(values);
                    return values;
                }
            );
        }

        public doGet(model: GL_Model, id:string) : Promise<Entity> {
            let params = [{_name : "{id}", _value : id}];
            return GL_Core.doExecute<any>(GL_Core.SERVER, model._linkGET, params, null).then<Entity>(
                values => {
                    return GL_Core.Entity.create(model, values);
                }
            );
        }

        public doGetAll(model: GL_Model) : Promise<GL_Array<Entity>> {
            let params = [];
            return GL_Core.doExecute<any[]>(GL_Core.SERVER, model._linkGETALL, params, null).then<GL_Array<Entity>>(
                values => {
                    var ret  = new GL_Array<Entity>();
                    for (let o of values){
                        let toAdd = GL_Core.Entity.create(model, o);
                        ret.push(toAdd);
                    }
                    return ret;
                }
            );
        }

        public doResolve(data: Entity, field : string) : Promise<Entity> {

            if (!data._model.attributes[field])
                throw new Error("Field not defined to be resolved:" + field);   

            if (!this._models[data._model.attributes[field]._class])
                throw new Error("Model not defined to be resolved:" + field);
         
            let id = data[data._model._id];
            let collection = data._model.attributes[field]._isCollection;
            let targetModel = this._models[data._model.attributes[field]._class];

            let params = [{_name : "{id}", _value : id}];
            return GL_Core.doExecute<any[]>(GL_Core.SERVER, data._model.attributes[field]._linkGET, params, null).then<Entity>(
                values => {
                    

                    if (!collection){
                        data._resolve(field,  GL_Core.Entity.create(targetModel, values))
                    }else {
                        for (let o of values){
                            var ret  = new GL_Array<Entity>();
                            let toAdd = GL_Core.Entity.create(targetModel, values);
                            ret.push(toAdd);
                        }
                        data._resolve(field,ret);
                    }
                    
                    return data;
                }
            );
        }

   }

   /**********************************************************************************************
   ***********************************************************************************************/


    export function getURL(server :GL_Server , link : GL_Link<any>, params : GL_Link_Param[]) : string {
        var url = server._host + link._href;
        if (params){
          for (let param  of params){
               console.debug("Inject parameters", param);
               url = url.replace(param._name,param._value);
          }
        }
       return url;
    }


     export function doExecute<T>(server :GL_Core.GL_Server , link : GL_Core.GL_Link<T>, params : GL_Core.GL_Link_Param[], data : T[]) : Promise<T> {

         
         console.debug("doExecute : create ", link);
         return new Promise<T>( (resolve,reject) => {
            
            $.ajax({
                    url: getURL(server,link,params),
                    type: link._method,
                    data: data
                }).then (
                    cs => {
                    var response = <GL_Core.GL_Response<T>>cs;
                    console.debug("doExecute : resolved ", link);
                    if (!cs){
                        console.error("doExecute : no response from server", server);
                        reject (new Error("Ajax no response from server " + server._host));
                    } else  if (response._error){
                        console.error("doExecute : internal server error", response);
                        reject( new Error(response._error_message + "->" + response._error_stackTrace));
                    }else {
                        console.debug("doExecute : data ", response);
                        resolve(<T>response._result._data);
                    }
                    },
                    (data, status, error) => {
                        console.error("doExecute : error", error);
                        reject(new Error(status + " -> " + error));
                    });
         });

    }

    export const SERVER : GL_Server = new GL_Server();
    export const SERVICE : GL_Service = new GL_Service();
}
