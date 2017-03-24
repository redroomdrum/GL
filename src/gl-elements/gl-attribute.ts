@component("gl-attribute")
class GL_Attribute extends polymer.Base implements polymer.Element
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
    public errormessage : string;

    @property()
    public infomessage : string;

    @property()
    public currentmessage : string;

    @observe("isvalidated")
    protected onIsValidatedChange(){
        this.refresh();
    }

    @observe("isvalid")
    protected onIsValidChange(){
        this.refresh();
    }

    public refresh(){
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


    public insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    public inject(element: HTMLElement){
        this.insertAfter(element, this.$.injection)
    }

    ready() {
        this.refresh();
    }

}


GL_Attribute.register();
