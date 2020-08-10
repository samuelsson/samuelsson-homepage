import React from 'react';

type EmojiProps = {
  emoji: string;
  label: string;
};

const Emoji = ({ emoji, label }: EmojiProps): JSX.Element => (
  <span className="emoji" role="img" aria-label={label}>
    {emoji}
  </span>
);

export default Emoji;
