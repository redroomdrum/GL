/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="gl_core.ts"/>

@component("gl-wrapper-collapse")
class GL_Wrapper_Collapse extends polymer.Base implements polymer.Element
{


    protected iconOpen : string = "fa-plus";
    protected iconClose : string = "fa-minus";

    @property()
    public label: string;

    @property()
    public col: number

    @property()
    public opened: boolean;


    @observe("isvalidated")
    protected onIsValidatedChange(){
        this.refresh();
    }

    @observe("isvalid")
    protected onIsValidChange(){
        this.refresh();
    }

    public handleToggle(){
       this.opened = !this.opened;
       this.refresh();
    }

    protected refresh(){
       if (this.opened){
           (<HTMLAnchorElement>this.$.icon).classList.remove(this.iconOpen);
           (<HTMLAnchorElement>this.$.icon).classList.add(this.iconClose);
      }else {
           (<HTMLAnchorElement>this.$.icon).classList.add(this.iconOpen);
           (<HTMLAnchorElement>this.$.icon).classList.remove(this.iconClose);
      }
    }

    ready() {
        this.refresh();
    }

}


GL_Wrapper_Collapse.register();
