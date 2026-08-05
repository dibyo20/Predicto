import { useEffect, useRef, useState } from "react";
import { loadFaceLandmarker, startCamera, detect, cleanup } from "../utils/emotion";
import { useNavigate } from "react-router-dom";
import "../styles/EmotionDetector.scss";
import { useAuth } from "../../Auth/hooks/useAuth";

// SVG Icon Definitions
const FaceScannerLogo = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a1 1 0 1 0 2 0m2 0a1 1 0 1 0 2 0" strokeLinecap="round" />
    <path d="M12 12v2m-3 2s1.5 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
  </svg>
);

const CameraIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const DetectionIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.812 15.904L9 21m0 0l-.813-5.096M9 21h7.5c.62 0 1.2-.25 1.62-.66m-1.12-2.34A4.5 4.5 0 0 1 22.5 13.5c0-2.49-2.02-4.5-4.5-4.5h-1.35c-.72-1.5-2.22-2.5-3.98-2.5A6.003 6.003 0 0 0 6.75 12c0 .86.18 1.67.5 2.41" />
  </svg>
);

const StopIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

const MusicIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const LogoutIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ModelIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const StatusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const FaceDetectedIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2m-10 0H5a2 2 0 0 1-2-2v-2" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const LightbulbIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21h6m-6-3h6m-9-3.5a7.5 7.5 0 1 1 12 0c0 2.5-2 4.5-3 5H9c-1-.5-3-2.5-3-5z" />
  </svg>
);

const CrosshairIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

const EyeOffIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EyeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FacePlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const PlayIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export default function EmotionDetector() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const isDetectingRef = useRef(false);

  const [emotion, setEmotion] = useState("Waiting for detection");
  const [detectionTime, setDetectionTime] = useState("-- ms");
  const [faceDetected, setFaceDetected] = useState("No");
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("Initializing...");

  useEffect(() => {
    let active = true;

    const setup = async () => {
      try {
        setCameraStatus("Initializing...");
        const landmarker = await loadFaceLandmarker();
        if (active) {
          faceLandmarkerRef.current = landmarker;
        }

        const stream = await startCamera(videoRef);
        if (active) {
          streamRef.current = stream;
          setCameraStatus("Camera Ready");

          const callbacks = {
            setEmotion: (emo) => {
              if (isDetectingRef.current) setEmotion(emo);
            },
            setDetectionTime: (t) => {
              if (isDetectingRef.current) setDetectionTime(t);
            },
            setFaceDetected: (fd) => {
              if (isDetectingRef.current) setFaceDetected(fd);
            },
          };

          detect(videoRef, landmarker, isDetectingRef, callbacks, animationFrameRef);
        }
      } catch (err) {
        console.error("Camera access/initialization error:", err);
        if (active) {
          setCameraStatus("Camera Off");
        }
      }
    };

    setup();

    return () => {
      active = false;
      cleanup(videoRef, animationFrameRef, streamRef.current);
    };
  }, []);

  /**
   * Toggles the live facial analysis detection loop.
   */
  const handleToggleDetection = () => {
    if (isDetecting) {
      isDetectingRef.current = false;
      setIsDetecting(false);
      setFaceDetected("Yes");
    } else {
      isDetectingRef.current = true;
      setIsDetecting(true);
      setEmotion("Detecting...");
      setDetectionTime("-- ms");
      setFaceDetected("No");
    }
  };

  /**
   * Navigates to the SongsByMood route using the parsed emotion query parameter.
   */
  const handleShowMusic = () => {
    if (emotion === "Waiting for detection" || isDetecting) return;
    const moodQuery = getMoodQueryKeyword(title);
    navigate(`/songsbymood?mood=${moodQuery}`, { state: { mood: title } });
  };

  /**
   * Resolves raw title text into standardized mood query keywords for playlist queries.
   * @param {string} titleText - The friendly mood title.
   * @returns {string} The query string param representation.
   */
  const getMoodQueryKeyword = (titleText) => {
    const t = titleText.toLowerCase();
    if (t.includes("very happy")) return "very happy";
    if (t.includes("happy")) return "happy";
    if (t.includes("surprise")) return "surprised";
    if (t.includes("sad")) return "sad";
    if (t.includes("angry")) return "sad";
    return "happy";
  };

  /**
   * Parses the active model classification string into icons, titles and detailed subtexts.
   * @param {string} emo - The raw classification returned from the detector loop.
   * @returns {Object} Extracted rendering assets { emoji, title, subtitle }.
   */
  const parseEmotion = (emo) => {
    if (emo === "Waiting for detection") {
      return {
        emoji: "😐",
        title: "Waiting for detection",
        subtitle: "Start the camera to analyze emotions.",
      };
    }
    if (emo === "Detecting...") {
      return {
        emoji: "🔍",
        title: "Detecting...",
        subtitle: "Analyzing facial markers...",
      };
    }
    if (emo === "No Face Detected") {
      return {
        emoji: "👤",
        title: "No Face Detected",
        subtitle: "Position your face in the center of the frame.",
      };
    }

    const parts = emo.split(" ");
    const emoji = parts[0] || "😐";
    const title = parts.slice(1).join(" ") || "Neutral";
    let subtitle = "A balanced state of mind.";

    if (title.toLowerCase().includes("happy")) {
      subtitle = "You seem to be in a bright mood!";
    } else if (title.toLowerCase().includes("sad")) {
      subtitle = "It's okay to feel sad. Let us find a comforting sound.";
    } else if (title.toLowerCase().includes("surprise")) {
      subtitle = "Whoa! Something caught your eye!";
    } else if (title.toLowerCase().includes("angry")) {
      subtitle = "Take a deep breath. Let the music calm your energy.";
    }

    return { emoji, title, subtitle };
  };

  const { emoji, title, subtitle } = parseEmotion(emotion);

  return (
    <div className="detector-container">
      {/* Background Visual Effects */}
      <div className="detector-bg" aria-hidden="true">
        <div className="detector-orb detector-orb--1" />
        <div className="detector-orb detector-orb--2" />
        <div className="detector-grid" />
      </div>

      {/* Navigation Header */}
      <header className="detector-header">
        <div className="detector-header__content">
          <div className="detector-header__brand">
            {FaceScannerLogo}
            <span>Predicto</span>
          </div>
          <button
            type="button"
            className="detector-header__logout-btn"
            onClick={handleLogout}
            title="Log Out"
          >
            {LogoutIcon}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="detector-main">
        {/* Title Block */}
        <section className="detector-title-section">
          <h1 className="title-h1">
            Emotion <span>Detection</span>
          </h1>
          <p className="subtitle">
            Real-time AI analysis of facial expressions to interpret emotional state with high confidence.
          </p>
        </section>

        {/* Dynamic Panels */}
        <section className="detector-grid-layout">
          {/* Left Panel: Camera Viewport */}
          <div className="detector-card live-input">
            <div className="live-input__header">
              <h2 className="live-input__title">
                {CameraIcon} Live Input
              </h2>
              <span
                className={`live-input__status ${
                  cameraStatus === "Camera Ready" ? "live-input__status--ready" : ""
                }`}
              >
                <span className="status-dot" />
                {cameraStatus}
              </span>
            </div>

            <div className="live-input__viewport">
              <span className="corner corner--tl" />
              <span className="corner corner--tr" />
              <span className="corner corner--bl" />
              <span className="corner corner--br" />

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`live-input__video ${
                  cameraStatus !== "Camera Ready" || !isDetecting ? "live-input__video--hidden" : ""
                }`}
              />

              {(cameraStatus !== "Camera Ready" || !isDetecting) && (
                <div className="live-input__placeholder">
                  {FacePlaceholderIcon}
                  <p>Position your face in the center of the frame.</p>
                </div>
              )}
            </div>

            <div className="live-input__actions">
              <button
                type="button"
                className={`live-input__btn-start ${
                  isDetecting ? "live-input__btn-start--stop" : ""
                }`}
                onClick={handleToggleDetection}
                disabled={cameraStatus !== "Camera Ready"}
                style={{ width: "48%" }}
              >
                {isDetecting ? (
                  <>
                    {StopIcon} Stop Detection
                  </>
                ) : (
                  <>
                    {DetectionIcon} Start Detection
                  </>
                )}
              </button>
              <button
                type="button"
                className="live-input__btn-music"
                onClick={handleShowMusic}
                disabled={emotion === "Waiting for detection" || isDetecting}
                style={{ width: "48%" }}
              >
                {MusicIcon} See Suggested Music
              </button>
            </div>
          </div>

          {/* Right Panel: Analysis Result */}
          <div className="detection-result">
            <div className="detector-card detection-result__status-card">
              <div className="detection-result__emoji">{emoji}</div>
              <h3 className="detection-result__state-title">{title}</h3>
              <p className="detection-result__state-sub">{subtitle}</p>
            </div>

            {/* Metrics List */}
            <div className="detection-result__metrics">
              <div className="detection-result__metric-item">
                <span className="detection-result__metric-label">
                  {ClockIcon} Detection Time
                </span>
                <span className="detection-result__metric-value">{detectionTime}</span>
              </div>

              <div className="detection-result__metric-item">
                <span className="detection-result__metric-label">
                  {ModelIcon} Model
                </span>
                <span className="detection-result__metric-value">Predicto v1.0.0</span>
              </div>

              <div className="detection-result__metric-item">
                <span className="detection-result__metric-label">
                  {StatusIcon} Mode Detected
                </span>
                <span
                  className={`detection-result__metric-value ${
                    emotion !== "Waiting for detection" && emotion !== "Detecting..." && emotion !== "No Face Detected" ? "detection-result__metric-value--highlight" : ""
                  }`}
                >
                  {emotion !== "Waiting for detection" && emotion !== "Detecting..." && emotion !== "No Face Detected" ? title : "--"}
                </span>
              </div>

              <div className="detection-result__metric-item">
                <span className="detection-result__metric-label">
                  {FaceDetectedIcon} Face Detected
                </span>
                <span className="detection-result__metric-value">{faceDetected}</span>
              </div>
            </div>
          </div>
        </section>



        {/* Tips Section */}
        <section className="detector-tips-section">
          <h2 className="tips-title">Optimal Detection Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-card__icon">{LightbulbIcon}</div>
              <span className="tip-card__text">Good Lighting</span>
            </div>

            <div className="tip-card">
              <div className="tip-card__icon">{CrosshairIcon}</div>
              <span className="tip-card__text">Center Face</span>
            </div>

            <div className="tip-card">
              <div className="tip-card__icon">{EyeOffIcon}</div>
              <span className="tip-card__text">No Sunglasses</span>
            </div>

            <div className="tip-card">
              <div className="tip-card__icon">{EyeIcon}</div>
              <span className="tip-card__text">Look at Camera</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="detector-footer">
        <div className="detector-footer__content">
          <div className="detector-footer__left">
            {FaceScannerLogo}
            <span>Predicto</span>
          </div>
          <span className="detector-footer__copyright">
            © 2026 Predicto AI. Elevating your sonic journey.
          </span>
        </div>
      </footer>
    </div>
  );
}
