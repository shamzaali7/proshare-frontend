# ProShare — Frontend

React client for [ProShare](https://main--proshares.netlify.app), a platform where developers can share and discover projects, message each other in real time, and manage their profiles.

**Backend repo:** [proshare-backend](https://github.com/shamzaali7/proshare-backend)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Screenshots](#screenshots)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Firebase (Google OAuth + Email/Password) | Authentication |
| Axios | HTTP client for backend API |
| Socket.io-client | Real-time messaging |
| Tailwind CSS | Utility-first styling |
| Cloudinary | Image uploads (via backend) |

---

## Features

- **Authentication** — Sign in with Google OAuth or create an account with email + password; email/password accounts require email verification before access is granted
- **Project feed** — Browse all developer projects on the home page with a loading spinner during Heroku cold starts
- **Full project CRUD** — Create, edit, and delete your own projects; images can be uploaded directly as a file or provided as a URL
- **Real-time messaging** — 1-on-1 chat via Socket.io with a 10-second polling fallback; sidebar always shows the true latest message read directly from the database
- **Reliable first message** — Auto-retry logic with server-side verification prevents duplicate messages and false "Failed to send" states caused by Heroku cold-start timeouts
- **Developer profiles** — Personal dashboard showing your projects; update your profile icon via file upload or URL
- **Search** — Find projects and developers across the platform
- **IDE viewer** — Embedded code sandbox for viewing project code
- **Responsive design** — Optimized for desktop, tablet, and mobile

---

## Project Structure

```
src/
├── Components/
│   ├── Header.js             # Navigation bar with auth state
│   ├── Footer.js             # Site footer
│   ├── Home.js               # Project feed (all projects) with cold-start spinner
│   ├── Profile.js            # User dashboard (own projects)
│   ├── ProjectCard.js        # Reusable project card component
│   ├── ProjectFormModal.js   # Create / edit project form (file upload + URL)
│   ├── CommentModal.js       # Project comment modal
│   ├── AuthModal.js          # Sign-in / sign-up modal (Google + email/password)
│   ├── EmailVerification.js  # Email verification pending screen
│   ├── Messaging.js          # Messaging page (conversation list + chat)
│   ├── ConversationList.js   # Sidebar list of conversations
│   ├── ChatWindow.js         # Active chat thread
│   ├── Search.js             # Search page
│   └── IDE.js                # Embedded code editor/viewer
├── Config/
│   └── firebase-config.js    # Firebase app initialization
├── Styling/
│   ├── index.css             # Global styles
│   ├── Header.css            # Header-specific styles
│   ├── Messaging.css         # Messaging layout styles
│   └── ProjectCard.css       # Project card styles
├── App.js                    # Routes + global state; renders EmailVerification when pending
└── index.js                  # React entry point + AppContext (auth, projects, messages)
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [Firebase](https://console.firebase.google.com) project with **Google** and **Email/Password** sign-in methods enabled (Authentication → Sign-in method)
- The [proshare-backend](https://github.com/shamzaali7/proshare-backend) running locally or deployed

### Installation

```bash
git clone https://github.com/shamzaali7/proshare-frontend.git
cd proshare-frontend
npm install
```

Create a `.env` file in the root (see [Environment Variables](#environment-variables)), then start the dev server:

```bash
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000) by default.

---

## Environment Variables

Create a `.env` file in the project root with your Firebase config values:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

These values are available in your Firebase project's **Project Settings → General → Your apps**.

---

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Screenshots

### Home — Project Feed
<img width="1440" alt="Home page" src="https://user-images.githubusercontent.com/115019127/212469090-4242c646-6c6b-40bb-a55d-a1023233d5d9.png">

### Profile — Developer Dashboard
<img width="1440" alt="Profile page" src="https://user-images.githubusercontent.com/115019127/212535748-9ed017b2-c013-46c8-a6a6-a5f38e0c0de1.png">

### Project Detail
<img width="1440" alt="Project detail" src="https://user-images.githubusercontent.com/115019127/212535592-9d7ebbde-0aff-4b1b-9cb1-fd2987eee70e.png">

### Create / Edit Project
<img width="1440" alt="Project form" src="https://user-images.githubusercontent.com/115019127/212469104-da8d542f-f2ab-494e-9cb1-418b599ea6de.png">

### Mobile Views

[Mobile Navigation](https://user-images.githubusercontent.com/115019127/212536299-a1400260-bb20-45d8-937a-8dfe62092120.PNG) · [Mobile Home](https://user-images.githubusercontent.com/115019127/212469297-ed60d0a8-b158-4fad-b2f8-e67e26d8336e.PNG) · [Mobile Dashboard](https://user-images.githubusercontent.com/115019127/212469113-bb156155-3c27-43d6-a442-31203ac63d61.PNG)

---

## Author

**Hamza Ali** — [GitHub](https://github.com/shamzaali7) · [LinkedIn](https://www.linkedin.com/in/hamza-ali7/)
