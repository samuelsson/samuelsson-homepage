import { ReactElement } from 'react';
// By importing SyntaxHighlighter directly from the esm directory we get this
// working with React Server Components. Otherwise, we would need 'use client'.
// https://codesti.com/issue/react-syntax-highlighter/react-syntax-highlighter/493
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import classNames from 'classnames';

import { fontNotoSansMono } from '@/utils/fontHelper';
import styles from './Code.module.scss';

const Code: CodeComponent = ({ children, className, inline }): ReactElement => {
  const match = /language-(\w+)/.exec(className || '');

  // Material Oceanic has a hardcoded font, this way we can overwrite it.
  const codeBlockStyle = {
    ...materialOceanic,
    'code[class*="language-"]': fontNotoSansMono.style,
  };

  return !inline ? (
    <SyntaxHighlighter
      className={styles.CodeBlock}
      language={match?.[1]}
      style={codeBlockStyle}
      showLineNumbers
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={classNames(styles.InlineCode, fontNotoSansMono.className)}>
      {children}
    </code>
  );
};

export default Code;
