// Strip all html tags from a string. Keeping just the text.
export const htmlToText = (html: string): string =>
  html.replace(/(<([^>]+)>)/g, '');

// Turning strings into hyphenated, url safe strings
export const toUrlSafePath = (name: string): string =>
  name.toLowerCase().replace(/\s/g, '-');
