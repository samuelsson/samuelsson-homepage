import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './GeneralRichText.module.scss';
import Code from './Code';
import UnorderedList from './UnorderedList';
import OrderedList from './OrderedList';
import BlockQuote from './BlockQuote';

export type GeneralRichTextType = {
  id: number;
  __component: 'general.rich-text';
  content: string;
};

type GeneralRichTextProps = {
  content: string;
};

const GeneralRichText = ({ content }: GeneralRichTextProps): ReactElement => {
  return (
    <ReactMarkdown
      className={styles.GeneralRichText}
      components={{
        code: Code,
        ol: OrderedList,
        ul: UnorderedList,
        blockquote: BlockQuote,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default GeneralRichText;
