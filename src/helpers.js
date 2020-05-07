// Strip all html tags from a string. Keeping just the text.
export const htmlToText = (html) => html.replace(/(<([^>]+)>)/g, '');
