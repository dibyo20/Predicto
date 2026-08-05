import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const loadFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
    );

    return await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1,
    });
};

export const startCamera = async (videoRef) => {
    if (!videoRef.current) return null;
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });
    videoRef.current.srcObject = stream;
    return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve(stream);
        };
    });
};

export const stopCamera = (videoRef, stream) => {
    if (stream && typeof stream.getTracks === "function") {
        stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef?.current) {
        videoRef.current.srcObject = null;
    }
};

export const detect = (
    videoRef,
    faceLandmarker,
    isDetectingRef,
    callbacks, // { setEmotion, setDetectionTime, setFaceDetected }
    animationFrameRef,
) => {
    if (!videoRef.current || !faceLandmarker) return;

    if (isDetectingRef.current && videoRef.current.readyState >= 2) {
        const startTime = performance.now();
        const result = faceLandmarker.detectForVideo(
            videoRef.current,
            startTime,
        );
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        callbacks.setDetectionTime(`${duration} ms`);

        if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
            callbacks.setFaceDetected("Yes");
            const scores = {};
            result.faceBlendshapes[0].categories.forEach((c) => {
                scores[c.categoryName] = c.score;
            });
            callbacks.setEmotion(getEmotion(scores));
        } else {
            callbacks.setFaceDetected("No");
            callbacks.setEmotion("No Face Detected");
        }
    }

    animationFrameRef.current = requestAnimationFrame(() =>
        detect(videoRef, faceLandmarker, isDetectingRef, callbacks, animationFrameRef),
    );
};

export const initialize = async (
    videoRef,
    faceLandmarkerRef,
    setEmotion,
    animationFrameRef,
) => {
    const faceLandmarker = await loadFaceLandmarker();
    faceLandmarkerRef.current = faceLandmarker;
    const stream = await startCamera(videoRef);
    
    const callbacks = {
        setEmotion,
        setDetectionTime: () => {},
        setFaceDetected: () => {},
    };
    
    const isDetectingRef = { current: true };
    detect(videoRef, faceLandmarker, isDetectingRef, callbacks, animationFrameRef);
    return stream;
};

export const cleanup = (videoRef, animationFrameRef, stream) => {
    if (animationFrameRef?.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }
    stopCamera(videoRef, stream);
};

export const getEmotion = (s) => {
    const smile =
        Math.max(
            s.mouthSmileLeft || 0,
            s.mouthSmileRight || 0
        );

    const jaw =
        s.jawOpen || 0;

    const browDown =
        Math.max(
            s.browDownLeft || 0,
            s.browDownRight || 0
        );

    const browUp =
        Math.max(
            s.browOuterUpLeft || 0,
            s.browOuterUpRight || 0
        );

    const frown =
        Math.max(
            s.mouthFrownLeft || 0,
            s.mouthFrownRight || 0
        );

    // 😀 Very Happy
    if (smile > 0.75 && jaw > 0.3)
        return "😁 Very Happy";

    // 🙂
    if (smile > 0.45)
        return "😊 Happy";

    // 😲
    if (jaw > 0.5 && browUp > 0.38)
        return "😲 Surprise";

    // 😠
    if (browDown > 0.45 && frown > 0.3)
        return "😠 Angry";

    // 😢
    if (frown > 0.0045)
        return "😢 Sad";

    return "😐 Neutral";
};

export default getEmotion;