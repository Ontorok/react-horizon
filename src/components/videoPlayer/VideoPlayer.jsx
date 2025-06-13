import "./video-player.css";

import { useRef, useState } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  let playerRef = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if (nextIsPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
      <video width="250" ref={playerRef}>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}
