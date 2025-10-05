# 🌿 Plantains App Backend (Подорожники API)

**Plantains App Backend** — серверна частина командного навчального проєкту **Plantain (Подорожники)**, створеного у рамках Fullstack Bootcamp 75.
API забезпечує автентифікацію, управління користувачами, історіями подорожей та мандрівниками.
Розроблено з використанням **Node.js, Express, MongoDB та JWT**.

---

## 🚀 API Documentation

- **Base URL:** [https://plantains-app.onrender.com/api](https://plantains-app.onrender.com/api)
- **Swagger UI:** [https://plantains-app.onrender.com/api-docs](https://plantains-app.onrender.com/api-docs)

---

## ✨ Основні можливості

### 🔐 Auth

- `POST /auth/register` — реєстрація нового користувача (валідація Joi, хешування паролю, перевірка email).
- `POST /auth/login` — логін користувача (перевірка email + password, генерація JWT).
- `POST /auth/logout` — вихід користувача.
- `POST /auth/refresh` — оновлення токену доступу.
- `POST /auth/google` — авторизація через Google.
- `POST /auth/send-reset-email` — відправка email для скидання паролю.
- `POST /auth/reset-password` — скидання паролю.

### 👤 Users

- `GET /users/me` — отримати інформацію про поточного користувача.
- `PATCH /users/onboarding` — онбординг користувача.

### 📖 Stories

- `GET /stories` — отримати всі історії з фільтрацією по категоріях та популярності.
- `GET /stories/:id` — отримати історію за ID.
- `POST /stories` — створення нової історії (приватний роут).

### 🌍 Travellers

- `GET /travellers` — отримати список мандрівників.
- `GET /travellers/:id` — отримати інформацію про мандрівника.
- `GET /travellers/:id/stories` — отримати історії конкретного мандрівника.

---

## 🛠 Технології

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) для автентифікації
- [Joi](https://joi.dev/) для валідації
- [bcrypt](https://www.npmjs.com/package/bcrypt) для хешування паролів
- [Multer](https://github.com/expressjs/multer) для завантаження файлів
- [Cloudinary](https://cloudinary.com/) для збереження зображень
- [Nodemailer](https://nodemailer.com/) + [Handlebars](https://handlebarsjs.com/) для email-шаблонів
- [pino-http](https://github.com/pinojs/pino-http) для логування
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) для інтеграції Swagger
- [Redocly](https://redocly.com/) для генерації документації

---

## 📂 Структура проєкту

plantains-app-server/
│── src/
│ ├── config/ # конфігурація (env, cloudinary, db)
│ ├── controllers/ # логіка обробки запитів
│ ├── middlewares/ # middleware (authenticate, errorHandler)
│ ├── models/ # Mongoose-схеми (User, Story, Traveller)
│ ├── routes/ # маршрути (auth, users, stories, travellers)
│ ├── services/ # бізнес-логіка та інтеграції
│ ├── utils/ # утиліти (email, error, validators)
│ └── index.js # точка входу
│── docs/ # OpenAPI (Swagger, Redocly)
│── .editorconfig
│── .eslintrc.js
│── package.json
│── .env.example

---

## 📌 Roadmap

### ✅ MVP (готово)

- [x] Реєстрація та логін з JWT
- [x] Middleware авторизації
- [x] Logout + Refresh токени
- [x] Отримання інформації про користувача
- [x] CRUD для історій (створення, перегляд)
- [x] Скидання паролю через email
- [x] Google авторизація
- [x] Список та профілі мандрівників
- [x] Фільтрація історій по категоріях

### 🚀 Planned

- [ ] Верифікація email при реєстрації та зміні пошти
- [ ] Розширений CRUD для історій (редагування, видалення)
- [ ] Коментарі до історій
- [ ] Система лайків / рейтингів
- [ ] Docker конфігурація
- [ ] CI/CD інтеграція
- [ ] Мультимовність повідомлень (i18n)
- [ ] **PWA-ready API**

---

## ⚙️ Встановлення та запуск

```bash
# 1. Клонувати репозиторій
git clone https://github.com/prokopiy203/project-m.git

# 2. Перейти в директорію
cd project-m

# 3. Встановити залежності
npm install

# 4. Створити файл .env на основі .env.example

# 5. Запустити у режимі розробки
npm run dev

# 6. Запустити у продакшн режимі
npm start

# 7. Зібрати документацію OpenAPI
npm run build-docs
```
