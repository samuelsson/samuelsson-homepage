import { css } from 'styled-components';
import { colors } from './index';

const prism = css`
  code[class*='language-'],
  pre[class*='language-'] {
    background: none;
    font-family: menlo, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
      Courier, monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 2;
    tab-size: 2;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 0.85em 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 3px;
    box-shadow: ${({ theme }) => theme.prism.codeBlock.boxShadow};
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    font-size: 80%;
    color: ${({ theme }) => theme.prism.codeBlock.color};
    background-color: ${({ theme }) => theme.prism.codeBlock.backgroundColor};
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    color: ${({ theme }) => theme.prism.code.color};
    background-color: ${({ theme }) => theme.prism.code.backgroundColor};
    font-size: 85%;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    white-space: normal;
  }

  /* Inline code when also a link */
  :not(pre) > a > code[class*='language-']:hover {
    color: ${colors.white};
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #808080;
  }

  .token.punctuation {
    color: #d3e1f0;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #9876aa;
  }

  .token.number {
    color: #6897bb;
  }

  .token.boolean {
    color: #cc7832;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #6a8759;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #cc7832;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #008fc3;
  }

  .token.function,
  .token.class-name {
    color: #e2d769;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #dcdb49;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;

export default prism;
