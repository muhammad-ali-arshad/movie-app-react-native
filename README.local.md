## MovieTime – React Native Movie App

MovieTime is a React Native mobile app (built with Expo) for browsing movies from **The Movie Database (TMDB)**.  
It lets you explore trending, upcoming, and top‑rated movies, view detailed information, see cast members, and search for any movie.

---

### Features

- **Browse categories**
  - Trending movies (daily)
  - Upcoming movies
  - Top‑rated movies
- **Movie details**
  - Poster, title, rating, genres, overview
  - Similar/recommended movies
- **Cast & people**
  - View main cast for a movie
  - Person details and their movie credits
- **Search**
  - Search movies by title using TMDB search
- **Polished UI**
  - Tailwind‑style styling with `nativewind`
  - Custom theming and icons
  - Loading indicators and safe‑area handling

---

### Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- **Styling**: `nativewind` + `tailwindcss`, custom theme in `theme/index.js`
- **UI & UX**
  - `@expo/vector-icons`, `@react-native-icons/heroicons`
  - `react-native-reanimated`, `react-native-reanimated-carousel`, `react-native-snap-carousel`
  - `react-native-progress` for loaders
- **API**
  - TMDB (The Movie Database) REST API via `api/MoviesDb.js`
- **Tooling**
  - Expo Router
  - ESLint + `eslint-config-expo`
  - TypeScript config present (JS codebase, TS ready)

---

### Project Structure (client)

The main app code lives in the `client` folder:

- **`App.js`** – App entry, navigation setup and root component.
- **`api/MoviesDb.js`** – All TMDB endpoints and helper functions:
  - Trending, upcoming, top‑rated movies
  - Movie details, credits, similar movies
  - Person details and movie credits
  - Movie search and image URL helpers (`image500`, `image342`, `image185`).
- **`screens/`**
  - `HomeScreen.js` – Displays trending, upcoming, and top‑rated movies.
  - `MovieScreen.js` – Movie details, cast, and similar movies.
  - `PersonScreen.js` – Person details and filmography.
  - `SearchScreen.js` – Search interface for movies.
- **`components/`**
  - `TrendingMovies.js` – Horizontal carousel of trending movies.
  - `MovieList.js` – Reusable list for upcoming/top‑rated/other sections.
  - `Cast.js` – Cast list for a movie.
  - `loading.js` – Loading indicator component.
- **`navigation/appNavigation.js`** – Navigation stack and tabs configuration.
- **`theme/index.js`** – Color palette and shared style helpers.
- **`assets/images/`** – Icons, posters, and branding images.
- **Config files**
  - `tailwind.config.js`, `global.css`, `babel.config.js`, `metro.config.js`, `tsconfig.json`, `eslint.config.js`.

---

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn**
- **Expo** tooling:
  - `npx expo` (no global install required)  
  - Optional: Expo Go app on your phone (Android/iOS) or Android emulator / iOS Simulator

---

### Setup & Installation

1. **Clone this repository**

   ```bash
   git clone <your-repo-url>
   cd movie-app-react-native/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure TMDB API key**

   This project currently uses a **hard‑coded** TMDB API key in `api/MoviesDb.js`:

   ```js
   const apiBaseUrl = 'https://api.themoviedb.org/3'
   const apiKey = 'YOUR_TMDB_API_KEY_HERE'
   ```

   - Replace the value of `apiKey` with **your own** TMDB key.
   - You can create a free account and get an API key from TMDB’s website.
   - For production apps, you should move this key out of the source code (for example using environment variables or a backend proxy).

4. **Start the development server**

   From the `client` directory:

   ```bash
   npm run start
   # or
   npx expo start
   ```

5. **Run on a device/emulator**

   After running `expo start`, you can:

   - Press **`a`** to open the **Android emulator**
   - Press **`i`** to open the **iOS simulator** (macOS only)
   - Scan the QR code with the **Expo Go** app on your physical device

---

### Available Scripts

Inside the `client` directory:

- **`npm run start`** – Start the Expo development server.
- **`npm run android`** – Start the app on an Android emulator/device.
- **`npm run ios`** – Start the app on an iOS simulator/device.
- **`npm run web`** – Run the app in a web browser.
- **`npm run lint`** – Run ESLint checks.
- **`npm run reset-project`** – Reset the project (Expo starter utility).

---

### How the TMDB Integration Works

- All API logic is centralized in `api/MoviesDb.js`.
- Each function builds a TMDB endpoint and calls a shared `apiCall` helper which:
  - Appends extra query params when provided.
  - Uses the global `fetch` API.
  - Logs the request URL and basic response information for debugging.
  - Safely catches errors and returns an empty object when something goes wrong.
- Screens like `HomeScreen`, `MovieScreen`, `PersonScreen`, and `SearchScreen` import these helpers to display data.

---

### Styling & Theming

- Tailwind‑like classes are used through **`nativewind`** (see `global.css` and `tailwind.config.js`).
- Shared color styles and brand accents live in `theme/index.js` and are used in screens/components for consistency.
- The UI is optimized for a dark theme with neutral backgrounds and highlighted accent colors.

---

### Notes & Best Practices

- **API key security**: Never commit real production API keys to a public repository.  
  For learning/demo purposes this is acceptable, but in real apps you should hide keys (e.g. environment variables, or accessing TMDB via your own backend).
- **Error handling**: The `apiCall` helper logs errors to the console. You can extend it to show user‑friendly error messages or retry logic.
- **Performance**: For larger datasets, consider:
  - Pagination or infinite scrolling
  - Caching responses (e.g. in context, Redux, or React Query)

---

### Roadmap / Ideas

- **Favorites & watchlist** stored locally or synced with a backend.
- **User authentication** and personalized recommendations.
- **Filtering & sorting** by genre, year, rating, etc.
- **Offline support** with cached data.

---

### License

This project is intended for learning and personal use.  
Feel free to fork, modify, and adapt it for your own movie app projects.
