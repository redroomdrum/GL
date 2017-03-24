/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="gl_core.ts"/>

@component("gl-wrapper-control")
class GL_Wrapper_Control extends polymer.Base implements polymer.Element
{

    @property()
    public label: string;

    @property()
    public col: number;

    @property()
    public isvalidated : boolean;

    @property()
    public isvalid : boolean;

    @property()
    public errormessage : boolean;

    @property()
    public infomessage : boolean;

    @property()
    public currentmessage : boolean;

    @observe("isvalidated")
    protected onIsValidatedChange(){
        this.refresh();
    }

    @observe("isvalid")
    protected onIsValidChange(){
        this.refresh();
    }

    protected refresh(){
        let element = <HTMLDivElement> this.$.element
        if (this.isvalidated && !this.isvalid){
            this.currentmessage = this.errormessage;
            element.classList.add("has-error");

            var all = element.getElementsByTagName('*');
            for (var i = -1, l = all.length; ++i < l;) {
                all[i].classList.add("has-error");
            }


        }else {
            this.currentmessage = this.infomessage;
            element.classList.remove("has-error");
            var all = element.getElementsByTagName('*');
            for (var i = -1, l = all.length; ++i < l;) {
                all[i].classList.remove("has-error");
            }
        }  
    }

    ready() {
        this.refresh();
    }

}


GL_Wrapper_Control.register();
