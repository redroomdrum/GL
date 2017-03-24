/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="../../bower_components\DefinitelyTyped\kendo-ui\kendo-ui.d.ts"/>
/// <reference path="gl_core.ts"/>
/// <reference path="gl_ui.ts"/>



@component("gl-message")
class GL_Message  extends polymer.Base implements polymer.Element
{
   public static LEVEL_TRACE : string = "trace";
   public static LEVEL_INFO : string = "info";
   public static LEVEL_ERROR : string = "error";
   public static LEVEL_OK : string = "ok";

    @property()
    icon : string;

    @property()
    message : string;

    @property()
    level : string = GL_Message.LEVEL_TRACE;

    @property()
    public enable : boolean;

    public reset(){
        this.enable = false;
        this.$.glmessage.classList.add("disable");
        this.$.glmessage.classList.remove(this.level);
    }

    public show (level : string, message : string){
        
        this.reset();

        this.enable = true;
        this.message = message;
        this.level = level;
        switch (level){
            case GL_Message.LEVEL_TRACE:
                this.icon = "icons:radio-button-unchecked";
                break;
            case GL_Message.LEVEL_INFO:
                this.icon = "icons:info-outline";
                break;
            case GL_Message.LEVEL_ERROR:
                this.icon = "icons:error-outline";
                break;
            case GL_Message.LEVEL_OK:
                this.icon = "icons:check"
                break;
        }

         this.$.glmessage.classList.remove("disable");
         this.$.glmessage.classList.add(level);

    }

    ready(){
       this.reset();
       if (this.level && this.message)
         this.show(this.level, this.message);
    }

   
}

GL_Message.register();
