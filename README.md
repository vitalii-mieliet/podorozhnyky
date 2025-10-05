# 🌿 Podorozhnyky

**Podorozhnyky** — a team learning project created as part of **Fullstack Bootcamp 75**.  
This is a multi-page application for travelers, where users can:

- find and read travel stories,
- share their own impressions,
- manage their profile,
- save favorite stories.

The architecture is built in a **monorepo format (TurboRepo + npm workspaces)**, which includes both frontend and backend.

---

## 🚀 Demo

- **Live (Frontend, Vercel):** [https://podorozhnyky.vercel.app](https://podorozhnyky.vercel.app)
- **Backend (Render):** [https://podorozhnyky.onrender.com](https://podorozhnyky.onrender.com)
- **Swagger UI:** [https://podorozhnyky.onrender.com/api-docs](https://podorozhnyky.onrender.com/api-docs)

---

## ✨ Features

- 📱 **Responsive design** (320px / 375px / 768px / 1440px)
- 🔐 **Authentication & Authorization** (JWT, refresh tokens, Google OAuth2)
- 👤 **User profile** (saved and created stories)
- 📝 **CRUD for stories** (view, create, edit, delete)
- 🌍 **Travellers catalog** (lists, public profiles, pagination)
- ☁️ **Cloudinary** for image uploads
- 📡 **MongoDB + Mongoose** for data storage
- 📦 **TurboRepo** for managing frontend and backend in a single repository
- 🚨 **Error handling** and toast notifications on frontend
- 🛠 **API Documentation** with Swagger + Redocly

---

## 🛠 Technologies

**Frontend:**

- React 19, Vite 7, React Router DOM v7
- Redux Toolkit, Axios, Formik + Yup
- UI/UX: Toastify, Spinners, Skeletons
- ESLint, Prettier

**Backend:**

- Node.js 22, Express 5
- MongoDB, Mongoose
- JWT, Joi, bcrypt
- Cloudinary, Multer
- Nodemailer + Handlebars
- Swagger UI + Redocly
- pino-http

**Dev Tools:**

- TurboRepo, npm workspaces
- EditorConfig, ESLint, Prettier

---

## 📂 Monorepo structure

```plaintext
podorozhnyky/
│── apps/
│   ├── client/   # frontend (React + Vite)
│   └── server/   # backend (Node.js + Express)
│── package.json   # root TurboRepo config
│── turbo.json     # TurboRepo pipelines
│── README.md      # main documentation
```

---

## ⚙️ Installation & Run

### 🔹 Run all (TurboRepo)

```bash
# 1. Clone repository
git clone https://github.com/vitalii-mieliet/podorozhnyky.git

# 2. Go to directory
cd podorozhnyky

# 3. Install dependencies
npm install

# 4. Run both frontend & backend in parallel
npm run dev
```

### 🔹 Run separately

**Frontend:**

```bash
cd apps/client
npm install
npm run dev
```

**Backend:**

```bash
cd apps/server
npm install
npm run dev
```

---

## 🔑 ENV files

At this stage, we use **a single environment** (no dev/prod split).

**Frontend (`apps/client/.env`):**

```env
VITE_API_URL=http://localhost:3000/api
```

**Backend (`apps/server/.env`):**

```env
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLOUDINARY_URL=cloudinary://...
ALLOWED_ORIGINS=http://localhost:5173,https://podorozhnyky.vercel.app
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_OAUTH_REDIRECT=...
```

> In the future, we can split into `.env.development` and `.env.production`.

---

## 📌 Roadmap

- [x] MVP (authentication, profiles, stories, CRUD, travellers catalog)
- [ ] Email verification
- [ ] Dark theme
- [ ] Comments, likes/ratings
- [ ] Stories filtering and search
- [ ] i18n (multilanguage support)
- [ ] Docker + CI/CD
- [ ] PWA (offline mode, installation)

---

## 👨‍💻 Authors

The project was created by the **Fullstack Bootcamp 75** student team.  
The fork and monorepo were assembled and are maintained by [vitalii-mieliet](https://github.com/vitalii-mieliet).
