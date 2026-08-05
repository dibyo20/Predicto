# Predicto Client 🎨🎵

This is the React 19 frontend application for **Predicto**, powered by Vite, React Router v7, and Google MediaPipe tasks. It interfaces with the Predicto backend to capture user facial expressions, classify them, and stream a curated mood-matching soundtrack.

For instructions covering the backend and full-stack integration, refer to the [Root README](file:///c:/Users/asus/Desktop/Predicto/README.md).

---

## ✨ Features

*   **MediaPipe AI Camera Integration**: Utilizes WebAssembly (WASM) face landmarker configurations to map facial coordinates locally on the client's device in real time.
*   **Dynamic Expression Mapping**: Analyzes 52 facial blendshape coefficients (mouth smile, brow movement, jaw open state) to determine emotional state.
*   **Seamless State Contexts**: Manages user authentication and track playlists through React context boundaries (`AuthProvider` and `SongContextProvider`).
*   **Fully Customized Media Player**: Tailored audio controls (play, pause, next/prev, track slider seek, volume controller, volume mute toggling, custom styling).
*   **Intelligent Route Guards**:
    *   `<Protected>`: Guards user dashboards (`/predict` and `/songsbymood`) against unauthenticated sessions.
    *   `<PublicOnly>`: Prevents logged-in users from returning to landing page (`/`), login (`/login`), or signup (`/register`) forms.
*   **Sass (SCSS) Theme Engine**: Responsive layouts using nested modules and design tokens for dark themes and glassmorphism panels.

---

## 🛠️ Frontend Tech Stack

*   **Framework**: [React 19](https://react.dev/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Build Tool**: [Vite](https://vite.dev/)
*   **AI Engine**: [Google MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/face_landmarker)
*   **Styling**: SASS / SCSS (nested variables, mixins, custom styling)
*   **HTTP Client**: Axios

---

## 📁 Key Directories

```
Frontend/src/
├── Features/
│   ├── Auth/
│   │   ├── auth.context.jsx     # Controls global state authentication
│   │   ├── components/          # InputField, Protected, PublicOnly guard wrappers
│   │   ├── hooks/               # useAuth hook managing credentials
│   │   ├── pages/               # Register & Login user forms
│   │   └── styles/              # Styled auth split grids & background animations
│   │
│   ├── Expression/
│   │   ├── pages/               # EmotionDetectorPage webcam canvas scanner
│   │   ├── styles/              # Visual scanner dashboard stylesheet
│   │   └── utils/               # MediaPipe landmarker loader & getEmotion math
│   │
│   └── Song/
│       ├── hooks/               # useSong playlist fetcher
│       ├── pages/               # SongsByMood high-fidelity custom player
│       ├── services/            # Axios API calls to retrieve songs
│       └── song.context.jsx     # Tracks active song lists & playing indices
│
├── styles/                      # Global theme variables, reset, layout, main.scss
├── app.routes.jsx               # Navigation route map
├── App.jsx                      # App component mounting routing contexts
└── main.jsx                     # Core root mounting
```

---

## ⚙️ Running the Client

Ensure you have [Node.js](https://nodejs.org/) installed, then execute:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production distribution
npm run build

# Run ESLint validation
npm run lint
```

The app will run locally at [http://localhost:5173/](http://localhost:5173/).

---

## 🧠 Face Emotion Classification Logic

The emotion utility [emotion.js](file:///c:/Users/asus/Desktop/Predicto/Frontend/src/Features/Expression/utils/emotion.js) tracks the following coefficients computed by MediaPipe:
*   `mouthSmileLeft` & `mouthSmileRight`: Used to measure mouth smile curvature.
*   `jawOpen`: Determines if user is shouting, laughing, or surprised.
*   `browDownLeft` & `browDownRight`: Measures frown intensity.
*   `browOuterUpLeft` & `browOuterUpRight`: Determines high brow elevation.
*   `mouthFrownLeft` & `mouthFrownRight`: Identifies standard sadness frown.

### Classification Matrix
```javascript
// Very Happy
if (smile > 0.75 && jaw > 0.3) return "😁 Very Happy";

// Happy
if (smile > 0.45) return "😊 Happy";

// Surprise
if (jaw > 0.5 && browUp > 0.38) return "😲 Surprise";

// Angry
if (browDown > 0.45 && frown > 0.3) return "😠 Angry";

// Sad
if (frown > 0.0045) return "😢 Sad";

// Neutral
return "😐 Neutral";
```
