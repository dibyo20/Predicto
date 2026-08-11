import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../Auth/hooks/useAuth";
import "../styles/SongsByMood.scss";

const FaceScannerLogo = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a1 1 0 1 0 2 0m2 0a1 1 0 1 0 2 0" strokeLinecap="round" />
    <path d="M12 12v2m-3 2s1.5 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
  </svg>
);

const LogoutIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const DetectAgainIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const PlayIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const PrevIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const NextIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const VolumeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const VolumeMuteIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export default function SongsByMood() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  
  const moodParam = searchParams.get("mood") || "happy";
  const detectedMoodTitle = location.state?.mood || moodParam;

  const { song, handlleGetSongs, loading } = useSong();

  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  /**
   * Formats the raw backend mood string to a descriptive, user-friendly UI title.
   * @param {string} text - The raw mood descriptor string.
   * @returns {string} The formatted mood title.
   */
  const getFriendlyMoodTitle = (text) => {
    const t = text.toLowerCase();
    if (t.includes("very happy")) return "Very Happy Mood Detected";
    if (t.includes("happy")) return "Happy Mood Detected";
    if (t.includes("sad")) return "Sad Mood Detected";
    if (t.includes("surprise")) return "Surprise Mood Detected";
    return "Neutral Mood Detected";
  };

  /**
   * Selects an appropriate emoji representing the detected emotional state.
   * @param {string} text - The raw mood descriptor.
   * @returns {string} An emoji string.
   */
  const getMoodEmoji = (text) => {
    const t = text.toLowerCase();
    if (t.includes("happy")) return "😊";
    if (t.includes("sad")) return "😢";
    if (t.includes("surprise")) return "😲";
    return "😐";
  };

  /**
   * Resolves the duration of fallback/mock tracks based on their file identifiers.
   * Calculates a deterministic layout helper duration for other tracks.
   * @param {Object} songItem - The song metadata object.
   * @returns {string} The formatted duration string (m:ss).
   */
  const getSongDurationText = (songItem) => {
    const url = songItem.songUrl || "";
    if (url.includes("Song-1.mp3")) return "2:40";
    if (url.includes("Song-2.mp3")) return "3:15";
    if (url.includes("Song-3.mp3")) return "3:02";
    if (url.includes("Song-4.mp3")) return "3:45";
    if (url.includes("Song-5.mp3")) return "2:10";
    if (url.includes("Song-6.mp3")) return "4:01";
    if (url.includes("Song-7.mp3")) return "3:22";
    if (url.includes("Song-8.mp3")) return "2:58";
    if (url.includes("Song-9.mp3")) return "3:40";

    const length = (songItem.title || "Song").length;
    const mins = 2 + (length % 3);
    const secs = (length * 7) % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /**
   * Fallback mock songs to ensure standard operations continue if backend query returns empty.
   * @param {string} mood - The current search parameter mood keyword.
   * @returns {Array<Object>} Fallback playlist items.
   */
  const getFallbackSongs = (mood) => {
    const m = mood.toLowerCase();
    if (m.includes("happy") || m.includes("very happy")) {
      return [
        {
          _id: "fb-1",
          title: "Sunshine Horizon",
          artist: "Lofi Beats",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          posterUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-2",
          title: "Groovy Radiance",
          artist: "Solar Waves",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-3",
          title: "Golden Hour Vibes",
          artist: "Coastline Lounge",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          posterUrl: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&auto=format&fit=crop&q=60",
          mood: mood
        }
      ];
    } else if (m.includes("sad")) {
      return [
        {
          _id: "fb-4",
          title: "Raindrops on Glass",
          artist: "Chill Ambient",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          posterUrl: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-5",
          title: "Faded Reflections",
          artist: "Echo Trails",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          posterUrl: "https://images.unsplash.com/photo-1445217143695-460129e43241?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-6",
          title: "Silent Whisper",
          artist: "Autumn Solitude",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60",
          mood: mood
        }
      ];
    } else {
      return [
        {
          _id: "fb-7",
          title: "Spark Particles",
          artist: "Cinematic Dream",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-8",
          title: "Unfolding Realities",
          artist: "Future Bass",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60",
          mood: mood
        },
        {
          _id: "fb-9",
          title: "Celestial Nexus",
          artist: "Zero Gravity",
          songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=60",
          mood: mood
        }
      ];
    }
  };

  const activeSongs = Array.isArray(song) && song.length > 0 ? song : getFallbackSongs(moodParam);
  const currentSong = activeSongs[currentSongIndex] || null;

  /**
   * Toggles the playback state between play and pause.
   */
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log("Playback failed:", e));
      setIsPlaying(true);
    }
  };

  /**
   * Toggles or loads song selection. Pauses/resumes if clicking currently active track.
   * @param {number} index - The target song index inside active playlist.
   */
  const handleSelectSong = (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
      setCurrentSongIndex(index);
    }
  };

  /**
   * Navigates to the next song in the active playlist.
   */
  const handleNext = useCallback(() => {
    if (activeSongs.length === 0) return;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % activeSongs.length);
  }, [activeSongs]);

  /**
   * Navigates to the previous song in the active playlist.
   */
  const handlePrevious = () => {
    if (activeSongs.length === 0) return;
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + activeSongs.length) % activeSongs.length);
  };

  useEffect(() => {
    handlleGetSongs({ mood: moodParam });
  }, [moodParam, handlleGetSongs]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleAudioEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [handleNext]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.songUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  /**
   * Adjusts current audio timeline scrubber position.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event.
   */
  const handleProgressChange = (e) => {
    const val = parseFloat(e.target.value);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  /**
   * Adjusts the volume amplitude and muting flags.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event.
   */
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    audioRef.current.volume = val;
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  /**
   * Toggles the audio muting flag.
   */
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      audio.volume = volume;
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  /**
   * Helper utility to convert duration seconds to user-friendly time string (m:ss).
   * @param {number} secs - Raw seconds count.
   * @returns {string} Formatted track duration text.
   */
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="songs-page">
      <div className="songs-page__bg" aria-hidden="true">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="grid" />
      </div>

      <header className="detector-header" style={{ position: "relative", zIndex: 20 }}>
        <div className="detector-header__content">
          <div className="detector-header__brand" onClick={() => navigate("/predict")}>
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

      <main className="songs-page__content">
        <section className="mood-banner">
          <div className="mood-banner__info">
            <span className="mood-banner__icon">{getMoodEmoji(detectedMoodTitle)}</span>
            <div className="mood-banner__details">
              <h1 className="mood-banner__title">{getFriendlyMoodTitle(detectedMoodTitle)}</h1>
            </div>
          </div>
          <button
            type="button"
            className="mood-banner__btn"
            onClick={() => navigate("/predict")}
          >
            {DetectAgainIcon} Detect Again
          </button>
        </section>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
            <h2>Curating your playlist...</h2>
          </div>
        ) : (
          <section className="songs-grid">
            {activeSongs.map((item, index) => (
              <div
                key={item._id}
                className={`songs-grid__item ${
                  currentSongIndex === index ? "songs-grid__item--active" : ""
                }`}
                onClick={() => handleSelectSong(index)}
              >
                <div className="songs-grid__cover-wrapper">
                  <span className="songs-grid__badge">Recommended</span>
                  <img
                    src={item.posterUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300"}
                    alt={item.title}
                    className="songs-grid__cover"
                  />
                  <div className="songs-grid__overlay">
                    <button
                      type="button"
                      className="songs-grid__play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSong(index);
                      }}
                    >
                      {currentSongIndex === index && isPlaying ? PauseIcon : PlayIcon}
                    </button>
                  </div>
                </div>
                <div className="songs-grid__info">
                  <h3 className="songs-grid__title">{item.title}</h3>
                  <p className="songs-grid__artist">{item.artist || "Unknown Artist"}</p>
                </div>
                <div className="songs-grid__footer">
                  <span className="songs-grid__duration">{getSongDurationText(item)}</span>
                  {currentSongIndex === index && isPlaying && (
                    <div className="equalizer" aria-hidden="true">
                      <div className="equalizer__bar" />
                      <div className="equalizer__bar" />
                      <div className="equalizer__bar" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {currentSong && (
        <footer className="audio-player-bar">
          <div className="audio-player-bar__left">
            <img
              src={currentSong.posterUrl}
              alt={currentSong.title}
              className="audio-player-bar__cover"
            />
            <div className="audio-player-bar__details">
              <span className="audio-player-bar__song-title">{currentSong.title}</span>
              <span className="audio-player-bar__song-artist">{currentSong.artist || "Unknown Artist"}</span>
            </div>
          </div>

          <div className="audio-player-bar__middle">
            <div className="audio-player-bar__controls">
              <button
                type="button"
                className="audio-player-bar__btn"
                onClick={handlePrevious}
                title="Previous Song"
              >
                {PrevIcon}
              </button>
              <button
                type="button"
                className="audio-player-bar__btn audio-player-bar__btn--play"
                onClick={handlePlayPause}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? PauseIcon : PlayIcon}
              </button>
              <button
                type="button"
                className="audio-player-bar__btn"
                onClick={handleNext}
                title="Next Song"
              >
                {NextIcon}
              </button>
            </div>

            <div className="audio-player-bar__progress-wrapper">
              <span className="audio-player-bar__time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="audio-player-bar__slider"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
              />
              <span className="audio-player-bar__time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="audio-player-bar__right">
            <button
              type="button"
              className="audio-player-bar__volume-btn"
              onClick={handleToggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? VolumeMuteIcon : VolumeIcon}
            </button>
            <input
              type="range"
              className="audio-player-bar__volume-slider"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </div>
        </footer>
      )}
    </div>
  );
}
