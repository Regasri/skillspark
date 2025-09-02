import React, { useState, useEffect } from 'react';


const TypingText = ({ text = "Welcome To SkillSpark", className = "mng-text", speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const typeNextChar = () => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
        setTimeout(typeNextChar, speed);
      }
    };

    typeNextChar();

    return () => {
      index = text.length + 1; // stop typing if component unmounts
    };
  }, [text, speed]);

  return (
    <p className={className}>
      {displayedText}
      <span className="cursor">|</span>
    </p>
  );
};

export default TypingText;
