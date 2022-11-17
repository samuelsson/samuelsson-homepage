type EmojiProps = {
  symbol: string;
  label?: string;
};

const Emoji = ({ symbol, label }: EmojiProps): JSX.Element => {
  return (
    <span role="img" aria-label={label || ''} aria-hidden={!label}>
      {symbol}
    </span>
  );
};

export default Emoji;
