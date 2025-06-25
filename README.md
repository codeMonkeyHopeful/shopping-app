# 🛒 Shopping List App

A simple, single-page shopping list application built with **Vite**, **Firebase**, and a **Flask API backend**. The app supports item management (add, update, remove, view), using Firebase in development and a secure API in production.

---

## 🚀 Features

- ✅ Add, edit, and remove shopping list items
- 🔄 Firebase Firestore integration (in development)
- 🔐 JWT-secured Flask API for production use
- 🔑 Dev-only login using Firebase test credentials
- 💡 Environment-aware behavior switching (dev vs prod)
- 📱 Responsive design using Bootstrap

---

## 📁 Project Structure

```
├── firebaseClient.js           # Firebase setup (dev only)
├── firebaseLogin.js            # Firebase dev login logic
├── api/                        # Flask backend blueprints (optional)
├── public/
├── src/
│   └── main.js / App.js        # App entry and logic
├── .env                        # Local dev env vars (ignored in prod)
├── .env.production             # For production (should be blank or safe)
└── README.md
```

---

## 🔧 Development Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-user/shopping-list-app.git
cd shopping-list-app
npm install
```

### 2. Set Up Firebase Test User

Create a `.env` file in the root with your Firebase dev credentials:

```env
VITE_TEST_USER_EMAIL=you@example.com
VITE_TEST_USER_PASSWORD=yourpassword
```

✅ This user must exist in your Firebase Authentication panel and have Firestore access per your rules.

### 3. Run in Development Mode

```bash
npm run dev
```

- Connects to Firebase Firestore directly
- Automatically logs in with dev credentials
- Reads and writes data to Firestore

---

## 🔐 Production Use

In production:

- The Firebase SDK is **not initialized**
- All data access routes through a **Flask API**
- Requires a valid **JWT token** per request

### Firestore Rules Example

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid == "YOUR_FIREBASE_UID";
    }
  }
}
```

🔒 This ensures no one can write to Firestore without proper login.

---

## 📦 Build for Production

```bash
npm run build
```

Serve the contents of the `dist/` folder using a static server like Nginx, Caddy, Flask, or Docker.

---

## 🛠️ Flask Backend (Optional)

This app includes a Flask API with a `/firebase` route blueprint that:

- Manages shopping list items securely in production
- Validates access using JWT tokens
- Proxies calls to Firestore without exposing your Firebase credentials

### Example Routes

```
POST /firebase/add
POST /firebase/remove
POST /firebase/update
POST /firebase/get
```

See `api/firebase_routes.py` for the implementation.

---

## ✍️ Author

**Ryan Jasinski**  
🌐 [Git - CodeMonkeyHopeful](https://github.com/codeMonkeyHopeful)

---

## 📝 License

MIT License
