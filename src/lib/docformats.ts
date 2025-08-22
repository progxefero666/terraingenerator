//src\lib\docformats.ts

export class Keyvalue {
    public key: string;
    public value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }
}//end class

export type TKeyvalue = {
    key: string;
    value: any;
};

/**
 * class DocFormats.getMimetype
 */
export class DocFormats{
    
    public static FORMAT_JPG:TKeyvalue          = { key: "image/jpeg", value: "jpg"};
    public static FORMAT_PNG:TKeyvalue          = { key: "image/png", value: "png"};
    public static FORMAT_JPEG:TKeyvalue          = { key: "image/jpeg", value: "jpg"};    
    public static FORMAT_ZIP:TKeyvalue          = {key: "application/zip", value: "zip"};
    public static FORMAT_TEXTPLAIN:TKeyvalue    = {key: "text/plain", value: "txt"};
    public static FORMAT_JSON:TKeyvalue         = {key: "application/json", value: "json"};
    public static FORMAT_JAVASCRIPT:TKeyvalue   = {key: "text/javascript", value: "js"};   
    public static FORMAT_MARKDOWN:TKeyvalue     = { key: "text/plain", value: "md"};
    public static FORMAT_PDF:TKeyvalue          = { key: "application/pdf", value: "pdf"};


    public static getMimetype(extension:string): string {
        let mimetype: string = "";
        if(extension === DocFormats.FORMAT_JSON.value) {
            mimetype = DocFormats.FORMAT_JSON.key;
        }
        else if(extension === DocFormats.FORMAT_JAVASCRIPT.value) {
            mimetype = DocFormats.FORMAT_JAVASCRIPT.key;
        }
        else if(extension === DocFormats.FORMAT_MARKDOWN.value) {
            mimetype = DocFormats.FORMAT_MARKDOWN.key;
        }
        else if(extension === DocFormats.FORMAT_PDF.value) {
            mimetype = DocFormats.FORMAT_PDF.key;
        }
        else if(extension === DocFormats.FORMAT_JPG.value) {
            mimetype = DocFormats.FORMAT_JPG.key;
        }
        else if(extension === DocFormats.FORMAT_PNG.value) {
            mimetype = DocFormats.FORMAT_PNG.key;
        }
        else if(extension === DocFormats.FORMAT_JPEG.value) {
            mimetype = DocFormats.FORMAT_JPEG.key;
        }
        return mimetype;
    };

    public static getMimetypeFileExtension(format:string): string {
        let mimetype: string = "";
        if(format === DocFormats.FORMAT_JSON.key) {
            mimetype = DocFormats.FORMAT_JSON.value;
        }
        else if(format === DocFormats.FORMAT_JAVASCRIPT.key) {
            mimetype = DocFormats.FORMAT_JAVASCRIPT.value;
        }
        else if(format === DocFormats.FORMAT_MARKDOWN.key) {
            mimetype = DocFormats.FORMAT_MARKDOWN.value;
        }
        else if(format === DocFormats.FORMAT_PDF.key) {
            mimetype = DocFormats.FORMAT_PDF.value;
        }
        
        return mimetype;
    };    

    public static readonly LIST_FORMATS: Keyvalue[] = [           
        new Keyvalue(DocFormats.FORMAT_JPG.key, "jpg"),     
        new Keyvalue(DocFormats.FORMAT_PNG.key, "png"),            
        new Keyvalue(DocFormats.FORMAT_JPEG.key, "jpeg"),
        new Keyvalue(DocFormats.FORMAT_JSON.key, "json"), 
        new Keyvalue(DocFormats.FORMAT_JAVASCRIPT.key, "javscript")
    ]; 

};//end class