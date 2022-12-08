import "./createpostpopup.css";
//import React from "react";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";

export default function EmojiPickerBackgrounds({
  content,
  setContent,
  contentRef,
}) {
  const [picker, setPicker] = useState(false);

  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    contentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = contentRef.current;
    ref.focus();
    const start = content.substring(0, ref.selectionStart);
    const end = content.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setContent(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="/assets/gift.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={(e) => setPicker((prev) => !prev)}
      >
        <img src="/assets/post/smile.png" alt="" />
        {/* <span>: )</span> */}
      </i>
    </div>
  );
}
