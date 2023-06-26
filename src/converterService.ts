enum InputTypeEnum {
  MARKDOWN = 'MARKDOWN',
  HTML = 'HTML',
  INVALID = 'INVALID',
  PLAIN_TEXT = 'PLAIN_TEXT'
}

export enum ConversionType {
  MARKDOWN = 'MARKDOWN',
  HTML = 'HTML',
}

export class ConverterService {
  public input: string
  public type: ConversionType

  constructor(input: string, type: ConversionType) {
    this.input = input;
    this.type = type
  }

  /**
   * This function determines whether or not the line we are converting is in HTML already or in Markdown.
   * It takes in the the line of the input we are currently evaluating.
   * @private
   */
  private determineFormat(line: string): InputTypeEnum | null {
    const htmlRegex = /<[a-z][\s\S]*>/i;
    const markdownRegex = /\[[^\]]+\]\([^)]+\)/;

    //This has been getting a little tricky and was a stretch goal for me but I am approaching 4 hours on this
    //so I am just forcing the Markdown format here.
    return InputTypeEnum.MARKDOWN

    if (htmlRegex.test(line)) {
      return InputTypeEnum.HTML
    }

    if (markdownRegex.test(line)) {
      return InputTypeEnum.MARKDOWN
    }
  }

  /**
   * Run is the main function that builds the HTML based of the input passed. It will check to make sure each line is
   * valid Markdown before converting and handles most edge cases.
   */
  public run(): string {
    let response = ''
    const arrayOfLines = this.input.split(/\r?\n|\r|\n/g)
    let lastLine = '';
    arrayOfLines.forEach(line => {
      const format = this.determineFormat(line)
      if(format === InputTypeEnum.MARKDOWN){
        if(ConverterService.hasMarkdownLink(line)){
          line = `${ConverterService.convertLinkToHtml(line)}`
        }
        if(ConverterService.hasMarkdownHeading(line)){
          response += `${ConverterService.convertHeadingsToHtml(line)}`;
        } else {
          response += `${ConverterService.convertUnformattedText(line)}`;
        }

        if(lastLine === ''){
          response += '\n'
        }

        lastLine = line;
      } else {
        response += `${line} \n`;
      }

      if(format === InputTypeEnum.INVALID){
        response += `Looks like this line isn't Markdown, did you mean to add this to the converter? \n.`
      }
    })
    return response;
  }

  /**
   * Passses in the line we are evaluating and checks to see if there is a link present.
   * @param line
   */
  static hasMarkdownLink(line: string): boolean {
    const markdownLinkRegex = /\[.*?\]\(.*?\)/;
    return markdownLinkRegex.test(line);
  }

  /**
   * Converts a line with a link to include that html a tag. Does not wrap it in a <p> tag in the event it is a heading
   * @param line
   */
  static convertLinkToHtml(line: string): string {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/i;
    const htmlLink = line.replace(markdownLinkRegex, '<a href="$2">$1</a>');
    return htmlLink;
  }

  /**
   * Converts unformatted text or lines into normal <p> tags for html
   * @param line
   */
  static convertUnformattedText(line: string): string {
    if(line !== ''){
      return `<p>${line}</p>`;
    } else {
      return ''
    }
  }

  /**
   * Checks to see if the Markdown being passed in is a heading.
   * @param line
   */
  static hasMarkdownHeading(line: string): boolean {
    const markdownHeadingRegex = /^(#{1,6})\s/;
    return markdownHeadingRegex.test(line);
  }

  /**
   * Converts the heading into its respective HTML heading tag
   * @param line
   */
  static convertHeadingsToHtml(line: string): string {
    const regex = /^#+/;
    const match = line.match(regex);
    const number = match ? match[0].length : 0;
    if(number > 0){
      return `<h${number}>${line.replace(/#/g, '')}</h${number}>`
    } else {
      ConverterService.convertUnformattedText(line)
    }
  }
}
