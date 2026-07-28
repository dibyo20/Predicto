import { useEffect, useRef, useState } from "react";
import { cleanup, initialize } from "../utils/emotion";
import Expression from "../components/Expression";

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");

  useEffect(() => {
    const setup = async () => {
      await initialize(
        videoRef,
        faceLandmarkerRef,
        setEmotion,
        animationFrameRef,
      );
    };

    setup();

    return () => {
      cleanup(videoRef, animationFrameRef);
    };
  }, []);

  return (
    <div>
      <h1>Emotion Detector</h1>
      <Expression videoRef={videoRef} emotion={emotion} />
    </div>
  );
}
