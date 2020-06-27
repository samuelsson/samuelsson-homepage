import React from 'react';

interface EmojiProps {
  emoji: string;
  label: string;
}

const Emoji: React.FC<EmojiProps> = ({ emoji, label }): JSX.Element => (
  <span className="emoji" role="img" aria-label={label}>
    {emoji}
  </span>
);

export default Emoji;
