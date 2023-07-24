export const initialValues = {
  boldButton: false,
  italicsButton: false,
  strikeThrough: false,
  hyperLinkButton: false,
  blockQuoteButton: false,
  numberedListButton: false,
  bulletListButton: false,
  codeSnippetButton: false,
  codeBlockButton: false,
  fileUploadButton: false,
  emojiButton: false,
  mentionSomeoneButton: false,
};

export function buttonClicks(state, action) {
  switch (action.type) {
    case "activate_bold":
      return {
        boldButton: !state.boldButton,
      };
    case "activate_italics":
      return {
        italicsButton: !state.italicsButton,
      };
    case "activate_strikeThrough":
      return {
        strikeThrough: !state.strikeThrough,
      };
    case "activate_hyperLink":
      return {
        hyperLinkButton: !state.hyperLinkButton,
      };
    case "activate_blockQuote":
      return {
        blockQuoteButton: !state.blockQuoteButton,
      };
    case "activate_numberList":
      return {
        numberedListButton: !state.numberedListButton,
      };
    case "activate_bulletList":
      return {
        bulletListButton: !state.bulletListButton,
      };
    case "activate_codeSnippet":
      return {
        codeSnippetButton: !state.codeSnippetButton,
      };
    case "activate_codeBlock":
      return {
        codeBlockButton: !state.codeBlockButton,
      };
    case "activate_fileUpload":
      return {
        fileUploadButton: !state.fileUploadButton,
      };
    case "activate_emoji":
      return {
        emojiButton: !state.emojiButton,
      };
    case "activate_mentionSomeone":
      return {
        mentionSomeoneButton: !state.mentionSomeoneButton,
      };

    default:
      return state;
  }
}
