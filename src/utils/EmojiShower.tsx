import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function EmojiShower({
  left,
  top,
  visible,
}: {
  left: number;
  top: number;
  visible: boolean;
}) {
  const randomedEmojiUnicode = parseInt(
    (Math.floor(Math.random() * 80) + 128512).toString(16),
    16
  );

  return (
    <span
      className={clsx(
        visible ? "absolute" : "hidden",
        "text-2xl animate-bounce"
      )}
      style={{ left: left - 20, top: top - 20 }}
    >
      {String.fromCodePoint(randomedEmojiUnicode)}
    </span>
  );
}
