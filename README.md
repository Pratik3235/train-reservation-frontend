# 🚆 Train Seat Reservation – Frontend

A responsive React + Vite-based frontend for booking train seats, with secure authentication, a real-time seat grid, and role-based dashboard access.

🔗 **Live App:** [Train Seat Reservation Frontend](https://6811132467093ee900ac19f4--incomparable-gingersnap-76c15b.netlify.app/)

---

## 🛠 Tech Stack

- **Frontend Framework**: React.js (with Vite)
- **Routing**: React Router DOM
- **HTTP Requests**: Axios
- **Authentication**: JWT (localStorage-based)
- **Styling**: Inline styles / CSS

---

## 📦 Features

- 🔐 User Signup & Login
- 🎟️ Book up to 7 seats at once
- ✅ Real-time seat availability grid
- 🔄 Admin-only reset seats option
- 🔒 Route protection with `Navigate`
- 🚀 Deployed on Netlify

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/train-seat-frontend.git
cd train-seat-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API base URL

Edit `src/api.js`:

```js
const API = axios.create({ baseURL: 'https://your-backend-url.onrender.com/api' });
```

Replace the backend URL with your actual deployed backend.

### 4. Start the development server

```bash
npm run dev
```

---

## 📁 Project Structure

```
├── src
│   ├── components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── InitSeatsButton.jsx
│   ├── pages
│   │   └── Dashboard.jsx
│   ├── SeatGrid.jsx
│   ├── api.js
│   └── App.jsx
└── index.html
```

---

## 🌐 Deployment

This project is deployed using **Netlify**.

To deploy:

1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com), link your GitHub repo.
3. Use build command: `npm run build`
4. Set publish directory to: `dist/`

---

## 🔗 Important Links

- 🔧 **Backend Repo**: [your-backend-repo-link]
- 🌍 **Frontend Live URL**: [Train Seat Reservation on Netlify](https://6811132467093ee900ac19f4--incomparable-gingersnap-76c15b.netlify.app/)
- ⚙️ **Backend Live URL**: [your-backend-deployment-link]

---

## 📩 Contact

For suggestions or issues, please open an issue or contact [pratikpatil57432@gmail.com].
