/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="../../bower_components\DefinitelyTyped\kendo-ui\kendo-ui.d.ts"/>
/// <reference path="gl_core.ts"/>


module GL_UI {

    

    export class Converter<FROM, TO>{
        public _c_convert: GL_Core.ICallBackProcess<FROM,TO>;
        public _c_convertBack: GL_Core.ICallBackProcess<TO,FROM>;

        constructor(convert :  GL_Core.ICallBackProcess<FROM,TO>, convertBack : GL_Core.ICallBackProcess<TO,FROM> ){
            this._c_convert = convert;
            this._c_convertBack = convertBack;
        }
    }

    export class Validator<T>{
        public _c_validate: GL_Core.ICallBackProcess<T,string>;
      
        constructor(validate? :  GL_Core.ICallBackProcess<T,string>){
            this._c_validate = validate;
        }

        public executeValidation(value: T) : string{
            if (this._c_validate)
                return this._c_validate(value);
            return null;
        }
    }

     export class Descriptor<T>{
        public _c_description: GL_Core.ICallBackProcess<T,string>;
        
        constructor(description? : GL_Core.ICallBackProcess<T,string> ){
            this._c_description = description;
        }

        public getDescription(value: T) : string{
            if (this._c_description)
                return this._c_description(value);
            return null;
        }
    }

     export class Descriptor_Constant<T> extends Descriptor<T>{
        
         public message:string = "";

        constructor(message : string){
            super( v => {return this.message});
            this.message = message;
        }

    }

    export class Descriptor_StringCharCount extends Descriptor<string>{
            
            public charCount:number = 10;

            constructor(count:number){
                super( input => {
                    
                    let c:number = 0;
                    if (input)
                        c = input.length;
                      
                    return c + "/" + this.charCount;
                });

                this.charCount = count;
            }
        }

     export class Validator_StringRequired extends Validator<string>{
        
        public message:string = "Required!";

        constructor(mes?:string){
            super( input => {
                if (!input)
                    return this.message;
                if (input == "")
                    return this.message;
                return null;
            });

             if (mes)
                this.message = mes;
        }
    }

    export class Validator_NotNull<T> extends Validator<T>{
        
        public message:string = "Required!";

        constructor(mes?:string){
            super( input => {
                if (!input)
                    return this.message;

                return null;
            });

             if (mes)
                this.message = mes;
        }
    }

     export class Validator_NumberMin extends Validator<number>{
        
        public message:string = "Out of range, minimum";
        public num : number = 0;
        constructor(num: number, mes?:string){
            super( input => {
                if (!input)
                    return null;
                
                if (input < this.num)
                    return this.message;

                return null;
            });

             if (mes)
                this.message = mes;
             this.num = num;
        }
    }

     export class Validator_NumberMax extends Validator<number>{
        
        public message:string = "Out of range, maximum!";
        public num : number = 0;

        constructor(num: number, mes?:string){
            super( input => {
                if (!input)
                    return null;
                
                if (input > this.num)
                    return this.message;
                    
                return null;
            });

             if (mes)
                this.message = mes;

             this.num = num;
        }
    }


    export class GL_UI_Validator_StringCharCount extends Validator<string>{
        
        public message:string = "Too long!";
        public charCount:number = 10;

        constructor(count:number, mes?:string){
            super( input => {
                if (!input)
                    return null;
                if (input == "")
                    return null;
                
                if (input.length> this.charCount)
                    return this.message;
                
                return null;
            });

             if (mes)
                this.message = mes;
            
            this.charCount = count;
        }
    }



 
 

    export interface IDataSouce<T> extends GL_Core.Data{
             
    }

    export interface IDataSouceSingle<T extends GL_Core.Data> extends IDataSouce<T> , GL_Core.Data{
             
              _controller : GL_Core.View<T>;

             rawData : T;
             data : GL_Core.Data;
    }

     export interface IDataSouceArray<T extends GL_Core.Data> extends IDataSouce<T> ,GL_Core.Data{
              _controller : GL_Core.View<T>;

             rawData : GL_Core.GL_Array<T>;
             data : GL_Core.GL_Array<GL_Core.Data>
     }

      export  function  createDataSourceSingle<T extends  GL_Core.Data>(controller : GL_Core.View<T>): IDataSouceSingle<T>{
            let ret = GL_Core.Data.create({ });
            ret._createField("rawData");
            ret._createField("data");
            ret["_controller"] = controller;

            let ds = <IDataSouceSingle<T>> ret;

            ds._onChange("rawData").do( src => {
                if (ds.rawData == null){
                    ds.data =null;
                }else if (ds._controller){
                    ds.data = ds._controller.createViewSingle(<T>ds.rawData);
                } else {
                    ds.data = <T>ds.rawData;
                }
            })
            return ds;
      }

     export  function  createDataSourceArray<T extends  GL_Core.Data>(controller : GL_Core.View<T>): IDataSouceArray<T>{
            let ret = GL_Core.Data.create({ });
            ret._createField("rawData");
            ret._createField("data");
            ret["_controller"] = controller;

             let ds = <IDataSouceArray<T>> ret;

            ds._onChange("rawData").do( src => {
                if (ds.rawData == null){
                    ds.data =null;
                }else if (ds._controller){
                    ds.data = ds._controller.createViewArray(ds.rawData);
                } else {
                    ds.data = ds.rawData;
                }
            })
            return ds;
      }


    
     

     

    export class GLControlOptions extends GL_Core.Data{
         public readOnly : boolean = false;;
         public dirty : boolean = false;
         public busy : boolean = false;
         public error : boolean = false;
         public errorMsg : string = "";
         public infoMsg : string = "";
     }
 
    export class GLControlFieldOptions extends GLControlOptions{
         public field : string = ""; 
    }

    
    export class GLControlGridOptions extends GLControlOptions{
        public selected : GL_Core.GL_Array<GL_Core.Data>= new GL_Core.GL_Array<GL_Core.Data>();
        public selectedRaw : GL_Core.GL_Array<GL_Core.Data>= new GL_Core.GL_Array<GL_Core.Data>();
    }

    export abstract class GL_Control<HTML_TYPE extends HTMLElement, DATASOURCE extends IDataSouce<GL_Core.Data>, CONTROL_OPTIONS extends GLControlOptions, WIDGET_TYPE, WIDGET_OPTION_TYPE> {

        public controlOptions : CONTROL_OPTIONS;
        public dataSource : DATASOURCE;

        protected rootElement : HTMLElement;
        protected element : HTML_TYPE;

        public      widget : WIDGET_TYPE;
        protected   widgetOptions : WIDGET_OPTION_TYPE;

        protected abstract _buildControlOptions  () : CONTROL_OPTIONS;
        protected abstract _build  () : void;

        constructor(rooNode : HTMLElement , source : DATASOURCE,  options : WIDGET_OPTION_TYPE){
            this.dataSource = source;
            this.rootElement = rooNode;
            this.widgetOptions = options;
            this.controlOptions = this._buildControlOptions();    
        }
       
    }
    
  

    export class GLGrid extends GL_Control<HTMLDivElement, IDataSouceArray<GL_Core.Data>, GLControlGridOptions, kendo.ui.Grid, kendo.ui.GridOptions>{


        protected _kdataSource : kendo.data.DataSource;

        protected  _buildControlOptions  () : GLControlGridOptions{
            return <GLControlGridOptions> GL_Core.Data.create(new GLControlGridOptions());
        }

        protected  _build  () : void{
            this.element = document.createElement("div");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);

            this.widget = new kendo.ui.Grid(this.element, this.widgetOptions);
            
        }

        protected _refreshFromDataSource(){

            let arr : Object[] = [];
            for (let d of this.dataSource.data){
                arr.push(d._values);
            }

            this._kdataSource.data(arr);
            this._kdataSource.query();
        }

         constructor(rooNode : HTMLElement , source : IDataSouceArray<GL_Core.Data>,  options :  kendo.ui.GridOptions){
            super(rooNode, source,options);
            this.dataSource._onChange("data").do(r => this._refreshFromDataSource());
            this.widgetOptions.dataSource = new kendo.data.DataSource();
            this.widgetOptions.change =  ev => {
               let index = this.widget.select().index();
               let data =   this.dataSource.data[index];
               let dataRaw = this.dataSource.rawData[index];
              
               let selection = new GL_Core.GL_Array<GL_Core.Data>();
               selection.push(data);

               let selectionRaw = new GL_Core.GL_Array<GL_Core.Data>();
               selectionRaw.push(dataRaw);

               this.controlOptions.selected = selection;
               this.controlOptions.selectedRaw = selectionRaw;
            }
            this._kdataSource = this.widgetOptions.dataSource;
            this._build();
        }

    }

    export abstract class GL_ControlField<HTML_TYPE extends HTMLElement, CONTROL_OPTIONS extends GLControlFieldOptions, WIDGET_TYPE, WIDGET_OPTION_TYPE>
        extends GL_Control<HTML_TYPE,  IDataSouceSingle<GL_Core.Data>, CONTROL_OPTIONS, WIDGET_TYPE,WIDGET_OPTION_TYPE> {

        public controlOptions : CONTROL_OPTIONS;

      

        protected abstract _onReadOnlyChanged ();
        protected abstract _onDirtyChanged ();
        protected abstract _setUIValue  (value : any) : void;

        protected abstract _buildControlOptions  () : CONTROL_OPTIONS;
        protected abstract _build  () : void;

        protected _onUIValueChange (value : any) : void{
            if (this.dataSource.data[this.controlOptions.field] != value){
                this.dataSource.data[this.controlOptions.field] = value;
            }
        }

        private _dataChangeListener :  GL_Core.ICallBackConsume<GL_Core.EventDataFieldChange> = r => this._refreshFromData();
        protected  _refreshFromDataSource (ev: GL_Core.EventDataFieldChange) : void {
            if (!this.dataSource.data._exists(this.controlOptions.field) )
                throw new Error ("Field not found: " + this.controlOptions.field);

            if (ev.oldValue){
                ev.newValue._eventsOnChange[this.controlOptions.field].undo(this._dataChangeListener)
            }
            if (ev.newValue){
                ev.newValue._eventsOnChange[this.controlOptions.field].do(this._dataChangeListener);
            }
            this._refreshUI();
        }

        protected  _refreshFromData () : void {
            this._refreshUI();
        }

        protected  _refreshUI () : void {
            if (this.dataSource && this.dataSource.data && this.widget){
                this._setUIValue(this.dataSource.data[this.controlOptions.field]);
            }
        }

        constructor(rooNode : HTMLElement , source : IDataSouceSingle<GL_Core.Data>, field :string, options : WIDGET_OPTION_TYPE){
            super(rooNode, source,options);

            this.controlOptions.field = field;

            this.dataSource._onChange("data").do(r => this._refreshFromDataSource(r));
            this.controlOptions._onChange("readOnly").do(r => this._onReadOnlyChanged());
            this.controlOptions._onChange("dirty").do(r => this._onDirtyChanged());      
        }
    }

    export abstract class GLControlChoiche<HTML_TYPE extends HTMLElement, CONTROL_OPTIONS extends GLControlFieldOptions, WIDGET_TYPE, WIDGET_OPTION_TYPE> extends GL_ControlField<HTML_TYPE, CONTROL_OPTIONS, WIDGET_TYPE, WIDGET_OPTION_TYPE> {

        protected _kdataSource : kendo.data.DataSource;
        protected _dataSourceChoices : IDataSouceArray<any>;

      
        protected  _refreshFromDataSourceChoiches () : void {
            this._refreshChoicesUI();
            this._refreshUI();
        }

        protected abstract _refreshChoicesUI () : void;

         constructor(rooNode : HTML_TYPE , source : IDataSouceSingle<any>, field :string, options : WIDGET_OPTION_TYPE, sourceChoices : IDataSouceArray<any>){
             super(rooNode, source, field, options);
             this._dataSourceChoices = sourceChoices;
             this._dataSourceChoices._onChange("data").do(r => this._refreshFromDataSourceChoiches());
         }
    }

    export abstract class GLControlChoicheString<HTML_TYPE extends HTMLElement, CONTROL_OPTIONS extends GLControlFieldOptions, WIDGET_TYPE, WIDGET_OPTION_TYPE> extends GLControlChoiche<HTML_TYPE, CONTROL_OPTIONS, WIDGET_TYPE, WIDGET_OPTION_TYPE> {

         protected _fieldText   : string;

         constructor(rooNode : HTML_TYPE , source : IDataSouceSingle<any>, field :string, options : WIDGET_OPTION_TYPE, sourceChoices : IDataSouceArray<any>, fieldText : string){
             super(rooNode, source, field, options,sourceChoices);
             this._fieldText = fieldText;
         }
    }

    export  class GLNumeric extends GL_ControlField<HTMLInputElement, GLControlFieldOptions, kendo.ui.NumericTextBox,kendo.ui.NumericTextBoxOptions> {


        protected  _onReadOnlyChanged (){
            this.widget.readonly(this.controlOptions.readOnly);
        }
        protected  _onDirtyChanged (){

        }

        protected  _setUIValue (value : any) : void{
            this.widget.value(value);
        }

        protected  _buildControlOptions  () : GLControlFieldOptions{
            return <GLControlFieldOptions> GL_Core.Data.create(new GLControlFieldOptions());
        }

        protected  _build  () : void{
            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            
            this.widgetOptions.change = event => {
                this._onUIValueChange(this.widget.value());
            };
            this.widget = new kendo.ui.NumericTextBox( this.element, this.widgetOptions);
        }


         constructor(rooNode : HTMLInputElement , source : IDataSouceSingle<any>, field :string, options : kendo.ui.NumericTextBoxOptions ){
             super(rooNode, source, field, options);
             this._build()
             this._onReadOnlyChanged();
             this._onDirtyChanged();
             this._refreshUI();
         }

    }


  export  class GLText extends GL_ControlField<HTMLInputElement, GLControlFieldOptions, HTMLInputElement, any> {

        protected  _onReadOnlyChanged (){
            this.element.readOnly = this.controlOptions.readOnly;
        }
        protected  _onDirtyChanged (){

        }

        protected  _setUIValue (value : any) : void{
            this.widget.value = value;
        }

        protected  _buildControlOptions  () : GLControlFieldOptions{
            return <GLControlFieldOptions>  GL_Core.Data.create(new GLControlFieldOptions());
        }

        protected  _build  () : void{

            this.element = document.createElement("input");
            this.element.classList.add("k-textbox");
            this.element.style.width = "100%";
            this.widget = this.element;
            
            this.rootElement.appendChild(this.element);
            this.widget.addEventListener('blur', (event) => {
                this._onUIValueChange( this.widget.value );
            });     
        }

         constructor(rooNode : HTMLInputElement , source : IDataSouceSingle<any>, field :string, options : kendo.ui.NumericTextBoxOptions ){
             super(rooNode, source, field, options);
             this._build()
             this._onReadOnlyChanged();
             this._onDirtyChanged();
             this._refreshUI();
         }

    }


    export class IGLControlOptionsTextButton extends GLControlFieldOptions{
        public triggerButton : boolean = false;
    }

    export  class GLTextButton extends GL_ControlField<HTMLInputElement, IGLControlOptionsTextButton, HTMLInputElement, any> {


        protected  _onReadOnlyChanged (){
            this.element.readOnly = this.controlOptions.readOnly;
        }
        protected  _onDirtyChanged (){

        }

        protected  _setUIValue (value : any) : void{
            this.widget.value = value;
        }

        protected  _buildControlOptions  () : IGLControlOptionsTextButton{
            return <IGLControlOptionsTextButton> GL_Core.Data.create(new IGLControlOptionsTextButton());
        }

        protected  _build  () : void{

            /*
            <span class=" k-textbox k-space-right" style ="width: 100%">
                    <input id="kelement" type="text" class ="k-textbox" style ="width: 100%"/>
                    <span role ="button">
                        <span class="k-icon k-i-close"></span>
                    </span>
                    
                </span> 
            */

            let span = document.createElement("span");
            span.classList.add("k-textbox");
            span.classList.add("k-space-right");
            span.style.width = "100%";

            let spanButton = document.createElement("span");
            spanButton.setAttribute("role","button");
            spanButton.addEventListener('click', ev => this.controlOptions.triggerButton = !this.controlOptions.triggerButton);
            
            let spanIcon = document.createElement("span");
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
            this.widget.addEventListener('blur', (event) => {
                this._onUIValueChange( this.widget.value );
            });     
            
        }

         constructor(rooNode : HTMLInputElement , source : IDataSouceSingle<any>, field :string, options : kendo.ui.NumericTextBoxOptions ){
             super(rooNode, source, field, options);
             this._build()
             this._onReadOnlyChanged();
             this._onDirtyChanged();
             this._refreshUI();
         }

    }


    export  class GLDatepicker extends GL_ControlField<HTMLInputElement, GLControlFieldOptions, kendo.ui.DatePicker,kendo.ui.DatePickerOptions> {

        protected  _onReadOnlyChanged (){
            this.widget.readonly(this.controlOptions.readOnly);
        }
        protected  _onDirtyChanged (){

        }

        protected  _setUIValue (value : any) : void{
            this.widget.value(value);
        }

        protected  _buildControlOptions  () : GLControlFieldOptions{
            return <GLControlFieldOptions> GL_Core.Data.create(new GLControlFieldOptions());
        }

        protected  _build  () : void{

            if (!this.widgetOptions){
                this.widgetOptions = {};
                this.widgetOptions.culture = "it-IT";
                this.widgetOptions.format =  "dd/MM/yyyy";
            }

            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            
            this.widgetOptions.change = event => {
                this._onUIValueChange(this.widget.value());
            };
            this.widget = new kendo.ui.DatePicker( this.element, this.widgetOptions);
            
        }

         constructor(rooNode : HTMLInputElement , source : IDataSouceSingle<any>, field :string, options : kendo.ui.DatePickerOptions ){
             super(rooNode, source, field, options);
             this._build()
             this._onReadOnlyChanged();
             this._onDirtyChanged();
             this._refreshUI();
         }

    }


   export  class GLComboBox extends GLControlChoicheString<HTMLInputElement, GLControlFieldOptions, kendo.ui.ComboBox,kendo.ui.ComboBoxOptions> {

        protected  _onReadOnlyChanged (){
            this.widget.readonly(this.controlOptions.readOnly);
        }
        protected  _onDirtyChanged (){

        }

        protected _kdataSource : kendo.data.DataSource;

        protected _findValue(value : any) : number {
            for (let item of this._dataSourceChoices.data){
                if (value[this._fieldText] == item[this._fieldText]){
                    return this._dataSourceChoices.data.indexOf(item);
                }
            }
            return -1;
        }

        protected  _setUIValue (value : any) : void {

            if (this._dataSourceChoices.data){
                let index = this._findValue(value);
                this.widget.select(index);
            }

        }

        protected  _buildControlOptions  () : GLControlFieldOptions{
            return <GLControlFieldOptions> GL_Core.Data.create(new GLControlFieldOptions());
        }

        protected  _build  () : void{

            if (!this.widgetOptions){
                this.widgetOptions = {};
            }
            if (!this.widgetOptions.dataSource){
                this.widgetOptions.dataSource = new kendo.data.DataSource();
            }

            this._kdataSource = this.widgetOptions.dataSource;
            this.widgetOptions.dataTextField = this._fieldText;

            this.element = document.createElement("input");
            this.element.style.width = "100%";
            this.rootElement.appendChild(this.element);
            
            this.widgetOptions.change = event => {
                if (this._dataSourceChoices.data){
                    let selection = this.widget.select();
                    this._onUIValueChange(this._dataSourceChoices.data[selection]);
                }
            };
            this.widget = new kendo.ui.ComboBox( this.element, this.widgetOptions);
            
        }

         protected  _refreshFromDataSourceChoiches () : void {
            this._refreshChoicesUI();
        }


        protected  _refreshChoicesUI () : void {
            if (this._dataSourceChoices){
                 this._kdataSource.data(this._dataSourceChoices.data);
                 this._kdataSource.query();
                 if (this.dataSource.data)
                    this._setUIValue(this.dataSource.data[this.controlOptions.field]);
            }
               
        }

         constructor(rooNode : HTMLInputElement , source : IDataSouceSingle<any>, field :string, options : kendo.ui.ComboBoxOptions, sourceChoices : IDataSouceArray<any>, fieldText : string){
             super(rooNode, source, field, options, sourceChoices, fieldText);
             this._build()
             this._onReadOnlyChanged();
             this._onDirtyChanged();
             this._refreshUI();
         }
    }



  



}
