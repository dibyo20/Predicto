import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [emotion, setEmotion] = useState("Detecting...");

  useEffect(() => {
    let animationId;

    const initialize = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "VIDEO",
          outputFaceBlendshapes: true,
          numFaces: 1,
        },
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        detect();
      };
    };

    const detect = () => {
      if (!videoRef.current || !faceLandmarkerRef.current) return;

      const now = performance.now();

      const result = faceLandmarkerRef.current.detectForVideo(
        videoRef.current,
        now,
      );

      if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
        const scores = {};

        result.faceBlendshapes[0].categories.forEach((c) => {
          scores[c.categoryName] = c.score;
        });

        setEmotion(getEmotion(scores));
      }

      animationId = requestAnimationFrame(detect);
    };

    initialize();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} autoPlay playsInline width={500} />

      <h2>{emotion}</h2>
    </div>
  );
}

function getEmotion(s) {
  const smile = Math.max(s.mouthSmileLeft || 0, s.mouthSmileRight || 0);

  const jaw = s.jawOpen || 0;

  const browDown = Math.max(s.browDownLeft || 0, s.browDownRight || 0);

  const browUp = Math.max(s.browOuterUpLeft || 0, s.browOuterUpRight || 0);

  const frown = Math.max(s.mouthFrownLeft || 0, s.mouthFrownRight || 0);

  // console.log(s.mouthFrownLeft, s.mouthFrownLeft);
  // 😀 Very Happy
  if (smile > 0.75 && jaw > 0.3) return "😁 Very Happy";

  // 🙂
  if (smile > 0.45) return "😊 Happy";

  // 😲
  if (jaw > 0.5 && browUp > 0.38) return "😲 Surprise";

  // 😠
  if (browDown > 0.45 && frown > 0.3) return "😠 Angry";

  // 😢
  if (frown > 0.0045) return "😢 Sad";

  return "😐 Neutral";
}
