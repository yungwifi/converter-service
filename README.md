# Mail Chimp Take Home Test 

In this code challenge I created a Conversion Service to convert Markdown to HTML.
The way it stands right now is the service class takes 2 inputs, the markdown you want to convert and the conversion type. 
Currently, it only converts markdown to html but I ultimately would like to be able to handle conversions from both ends, 
so HTML to Markdown and Markdown to HTML. 

And example use case: 

```ts
const input = `# Sample Document
              
              Hello!
              
              This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.`
const converterService = new ConverterService(input, ConversionType.MARKDOWN)
const conversion = converterService.run();
```

The run function is the method that handles the conversion and returns a string of the conversion. 

## How to run
You can run `npm run test` in the terminal it will print out the conversions of 3 different scenarios. Two of them 
provided in the challenge. 

Or you can create your own inputs by running `npm run start` and making post requests to `localhost:3000/html` with a 
request parameter `input`. That rest endpoint will return your conversion. 

## Some things I'd like to add 
Adding conversions both ways to this class. HTML -> Markdown and Markdown -> HTML.

Handling edge cases a little better. For example a regex function that determines the validity of 
the HTML or Markdown being passed in on a line by line basis.

How to add Markdown with code blocks would be cool. Not sure what that looks like, maybe just wrapped in a <p> tag.

## Known issues 

Right now I am having an issue with line breaks in Markdown and converting them to HTML. 
This example specifically: 
```
How are you?
What's going on?
```
is converting to 2 `<p>` tags instead keeping them in one `<p>` tag and having a break in the line. I know that in HTML 
line breaks like that or the additional `<p>` doesn't make a huge difference but if we wanted to add classes or id 
attributes to these html tags in the conversion this would create an issue down the road. 

My function to determine the type of line being passed in seems to be very funky and I think its a regex issue. Basically
I wanted to write a function to check the line I am about to convert to verify I am not about to set myself up for failure 
by trying to convert a line that would break the system. However, it is having very weird behavior for example not detecting 
headings. I'm at about 4 hours on this challenge and I know you all asked us not to spend more than that on it so I am putting 
this away and storing the feature in the NTH backlog. 
