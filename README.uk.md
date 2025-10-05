# 🌿 Подорожники

**Подорожники** — командний навчальний проєкт, створений у рамках Fullstack Bootcamp 75.  
Це багатосторінковий застосунок для мандрівників, де користувачі можуть:

- знаходити та читати історії подорожей,
- ділитися власними враженнями,
- вести профіль,
- зберігати улюблені історії.

Архітектура побудована у форматі **монорепозиторію (TurboRepo + npm workspaces)**, який включає фронтенд та бекенд.

---

## 🚀 Demo

- **Live (Frontend, Vercel):** [https://podorozhnyky.vercel.app](https://podorozhnyky.vercel.app)
- **Backend (Render):** [https://podorozhnyky.onrender.com](https://podorozhnyky.onrender.com)
- **Swagger UI:** [https://podorozhnyky.onrender.com/api-docs](https://podorozhnyky.onrender.com/api-docs)

---

## ✨ Основні можливості

- 📱 **Адаптивний дизайн** (320px / 375px / 768px / 1440px)
- 🔐 **Аутентифікація та авторизація** (JWT, refresh токени, Google OAuth2)
- 👤 **Профіль користувача** (збережені та створені історії)
- 📝 **CRUD для історій** (перегляд, створення, редагування, видалення)
- 🌍 **Каталог мандрівників** (списки, публічні профілі, пагінація)
- ☁️ **Cloudinary** для завантаження зображень
- 📡 **MongoDB + Mongoose** для зберігання даних
- 📦 **TurboRepo** для організації фронтенду та бекенду в єдиному монорепозиторії
- 🚨 **Обробка помилок** і toast-повідомлення на фронті
- 🛠 **Документація API** через Swagger + Redocly

---

## 🛠 Технології

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

## 📂 Структура монорепо

```plaintext
podorozhnyky/
│── apps/
│   ├── client/   # фронтенд (React + Vite)
│   └── server/   # бекенд (Node.js + Express)
│── package.json   # кореневий TurboRepo конфіг
│── turbo.json     # пайплайни TurboRepo
│── README.md      # основна документація
```

---

## ⚙️ Встановлення та запуск

### 🔹 Загальний запуск (TurboRepo)

```bash
# 1. Клонувати репозиторій
git clone https://github.com/vitalii-mieliet/podorozhnyky.git

# 2. Перейти в директорію
cd podorozhnyky

# 3. Встановити залежності для всіх пакетів
npm install

# 4. Запустити і фронт, і бекенд паралельно
npm run dev
```

### 🔹 Запуск окремо

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

## 🔑 ENV файли

На даному етапі використовується **одне середовище** (без поділу на dev/prod).

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

> У майбутньому можна розділити на `.env.development` та `.env.production`.

---

## 📌 Roadmap

- [x] MVP (авторизація, профілі, історії, CRUD, каталог мандрівників)
- [ ] Верифікація email
- [ ] Темна тема
- [ ] Коментарі, лайки/рейтинги
- [ ] Фільтрація та пошук історій
- [ ] i18n (мультимовність)
- [ ] Docker + CI/CD
- [ ] PWA (офлайн-режим, інсталяція)

---

## 👨‍💻 Автори

Проєкт створено командою студентів **Fullstack Bootcamp 75**.  
Форк і монорепозиторій зібрані та підтримуються [vitalii-mieliet](https://github.com/vitalii-mieliet).
