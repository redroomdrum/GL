/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>
/// <reference path="gl_core.ts"/>

@component("gl-control-wrapper")
class GL_Control_Wrapper extends polymer.Base implements polymer.Element
{

    @property()
    public label: string;

  
    ready() {

    }

}

GL_Control_Wrapper.register();
