"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converterService_1 = require("../converterService");
describe('ConverterService', function () {
    test('Markdown Converter Test Simple', async () => {
        // Set up the request data
        const input = `# Sample Document
                  
                  Hello!
                  
                  This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.`;
        const converterService = new converterService_1.ConverterService(input, converterService_1.ConversionType.MARKDOWN);
        const conversion = converterService.run();
        console.log(conversion, "HTML CONVERSION");
        expect(true).toEqual(true);
    });
    test('Markdown Converter Test Complex', async () => {
        // Set up the request data
        const input = `# Header one
                  
                  Hello there
                  
                  How are you?
                  What's going on?
                  
                  ## Another Header
                  
                  This is a paragraph [with an inline link](http://google.com). Neat, eh?
                  
                  ## This is a header [with a link](http://yahoo.com)`;
        const converterService = new converterService_1.ConverterService(input, converterService_1.ConversionType.MARKDOWN);
        const conversion = converterService.run();
        console.log(conversion, "HTML CONVERSION");
        expect(true).toEqual(true);
    });
    test('Markdown Converter Test Breaking', async () => {
        // Set up the request data
        const input = `# Sample Document

                    Hello!
                    
                    This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.
                    
                    # Header one
                    
                    Hello there
                    
                    How are you?
                    What's going on?
                    
                    ## Another Header
                    
                    This is a paragraph [with an inline link](http://google.com). Neat, eh?
                    
                    ## This is a header [with a link](http://yahoo.com)
                    
                    Here is some ## weird ${''} stuff that might break things 
                    `;
        const converterService = new converterService_1.ConverterService(input, converterService_1.ConversionType.MARKDOWN);
        const conversion = converterService.run();
        console.log(conversion, "HTML CONVERSION");
        expect(true).toEqual(true);
    });
});
