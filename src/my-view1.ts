/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="gl-elements/gl_core.ts"/>



@component("my-view1")
class MyTimer extends polymer.Base implements polymer.Element
{

   @property()
   public proxy : GL_Core.DataView<GL_Core.Data>;

   @property()
   public data : GL_Core.Entity;

   @property()
   public roles : GL_Core.Entity[];

   @property()
   public page : number;

   public onError(e:string, s:any){
      console.error(e,s);
   }

   

   @property()
   public dataControllerModel : GL_Core.View<GL_Core.Data> ;

   @observe("proxy")
   public proxyChange(){
       console.log(this.proxy);
   }
   

   public refreshUser(data : GL_Core.Entity){

        Promise.all([
            GL_Core.SERVICE.doResolve(data, "userRole"),
            GL_Core.SERVICE.doResolve(data, "groups"),
            GL_Core.SERVICE.doResolve(data, "documents"),
            GL_Core.SERVICE.doResolve(data, "documentsToValidate")
        ]).then(rs => 
        {
            this.dataSourceSingle.rawData = data;
        });

   }

   public refresh(){
       GL_Core.SERVICE.doGetAll(GL_Core.SERVICE._models["app.model.User"]).then (ret => this.dataSourceUsers.rawData = ret)

       GL_Core.SERVICE.doGetAll(GL_Core.SERVICE._models["app.model.UserRole"])
        .then(data => this.dataSourceUserRoles.data = data);
     
   }


   public loadUserData(){

   }
 
  public dataControllerUserExt  : GL_Core.View<GL_Core.Data> ;
  public dataControllerUser     : GL_Core.View<GL_Core.Data> ;

  public dataSourceSingle : GL_UI.IDataSouceSingle<GL_Core.Data>;
  public dataSourceArray : GL_UI.IDataSouceArray<GL_Core.Data>;

  public dataSourceUserRoles    : GL_UI.IDataSouceArray<GL_Core.Data>;
  public dataSourceUsers        : GL_UI.IDataSouceArray<GL_Core.Data>;

  ready() {

      this.dataControllerUserExt = new GL_Core.View<GL_Core.Data>();
      this.dataControllerUserExt.createPath<string>("id", "userId");
      this.dataControllerUserExt.createPath<string>("pname", "name");
      this.dataControllerUserExt.createPath<string>("psurname", "surname");
      this.dataControllerUserExt.createPath<string>("puserRole", "userRole");
      this.dataControllerUserExt.createPath<string>("puserRoleDesc", "userRole.name");

      this.dataControllerUser = new GL_Core.View<GL_Core.Data>();
      this.dataControllerUser.createPath<string>("id", "userId");
      this.dataControllerUser.createPath<string>("pname", "name");
      this.dataControllerUser.createPath<string>("psurname", "surname");
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

      let item = new GL_UI.GLTextButton(this.$.insertion, this.dataSourceSingle, "puserRoleDesc", null);
      item.controlOptions._onChange("triggerButton").do( ev => console.log("test"));

      let options : kendo.ui.GridOptions = {};
      options.selectable  = true;
      options.columns = [];
      options.columns.push({field : "id"});
      options.columns.push({field : "pname"});
      options.columns.push({field : "psurname"});
      let grid = new GL_UI.GLGrid (this.$.insertion, this.dataSourceUsers, options);
      grid.controlOptions._onChange("selectedRaw").do( ev =>{
           this.refreshUser( <GL_Core.Entity> grid.controlOptions.selectedRaw[0]);
      })

      GL_Core.SERVICE.doInit().then (r => this.refresh());

   }

   detatched() {

   }
}





MyTimer.register();
