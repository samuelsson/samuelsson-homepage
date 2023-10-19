import { ReactElement } from 'react';

import GeneralRichText, { GeneralRichTextType } from './GeneralRichText';

// Here I'll add more types as I add them in the CMS. Add switch/case in render.
export type Content = GeneralRichTextType;

type DynamicContentProps = {
  content: Content[];
};

const DynamicContent = ({ content }: DynamicContentProps): ReactElement => {
  return (
    <>
      {content.map((cont) => {
        // eslint-disable-next-line no-underscore-dangle
        switch (cont.__component) {
          case 'general.rich-text':
            return <GeneralRichText key={cont.id} content={cont.content} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicContent;
