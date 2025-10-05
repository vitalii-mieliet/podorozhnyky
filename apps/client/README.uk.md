# 🌿 Plantains App (Подорожники)

**Plantain (Подорожники)** — командний навчальний проєкт, створений у рамках Fullstack Bootcamp 75.  
Це багатосторінковий застосунок для мандрівників, де користувачі можуть:

- знаходити та читати історії подорожей,
- ділитися власними враженнями,
- вести профіль,
- зберігати улюблені історії.

Проєкт реалізовано як **MVP (minimum viable product)** з подальшим розширенням функціоналу.

---

## 🚀 Demo

[🔗 Live Demo (Vercel)](https://plantains-app-dev.vercel.app)

---

## 📸 Screenshots

_(тут будуть скріншоти інтерфейсу)_

---

## ✨ Основні можливості

- 📱 **Адаптивний дизайн**: mobile-first, точки перелому (320px / 375px / 768px / 1440px)
- 🎨 **UI/UX**: стилізація через **CSS Modules**, hover-ефекти, SVG-лого та іконки
- 🔐 **Аутентифікація та авторизація**: реєстрація, логін, приватні маршрути, refresh токени
- 👤 **Профіль користувача**: збережені та створені історії, перемикачі між ними
- 📝 **CRUD для історій**: перегляд, створення, редагування, видалення
- 🌍 **Каталог мандрівників**: список користувачів, публічні профілі, пагінація
- 🖼 **Popular & Our Travellers**: блоки з підвантаженням даних і кнопкою “Показати ще”
- 📦 **Перевикористовувані компоненти**: Layout, Header, Footer, InfoModal, MessageNoStories
- ⚡ **Стейт-менеджмент**: Redux Toolkit + React Redux
- 📡 **Запити до API**: Axios (з можливістю інтеграції React Query у roadmap)
- ⏳ **Стан завантаження**: спіннери, скелетони
- 🚨 **Обробка помилок**: toast-повідомлення, повідомлення у формах
- ✍️ **Форми та валідація**: Formik + Yup
- ☁️ **Деплой**: Vercel

---

## 🛠 Технології

**Core:**

- [React 19](https://react.dev/) + [React DOM](https://react.dev/)
- [Vite](https://vitejs.dev/) (з плагіном [SWC](https://swc.rs/))

**State Management:**

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [React Router DOM v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

**Forms & Validation:**

- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

**UI & UX:**

- [React Icons](https://react-icons.github.io/react-icons/)
- [clsx](https://github.com/lukeed/clsx)
- [modern-normalize](https://github.com/sindresorhus/modern-normalize)
- [react-toastify](https://fkhadra.github.io/react-toastify/)
- [react-spinners](https://www.davidhu.io/react-spinners/)
- [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)
- [react-responsive](https://github.com/contra/react-responsive)
- [focus-trap-react](https://github.com/focus-trap/focus-trap-react)
- [date-fns](https://date-fns.org/)

**Dev Tools:**

- ESLint, Prettier, EditorConfig
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)

---

## 📂 Структура проєкту

plantains-app-client/
│── public/ # статичні файли (favicon, assets)
│── src/
│ ├── assets/ # зображення, іконки, шрифти
│ ├── components/ # UI та спільні компоненти
│ ├── pages/ # сторінки застосунку
│ ├── redux/ # Redux slices, operations, selectors
│ ├── hooks/ # кастомні хуки
│ ├── utils/ # утиліти та хелпери
│ ├── styles/ # глобальні стилі, змінні
│ └── main.jsx # точка входу
│── .editorconfig
│── eslint.config.js
│── .prettierrc
│── vite.config.js
│── package.json

---

## 📑 Сторінки проєкту

### 🏠 Home (`/`)

- Hero-секція зі слоганом: _“Відкрийте світ подорожей з нами!”_
- About — короткий опис проєкту
- Popular — популярні історії
- Our Travellers — список мандрівників
- Join — секція з CTA для приєднання

### 📖 Stories (`/stories`)

- Заголовок _“Історії Мандрівників”_
- Список історій (зображення, назва, країна, опис, автор)
- Пагінація з кнопкою “Переглянути всі”

### 📄 Story (`/stories/[storyId]`)

- Деталі історії: назва, автор, дата, текст, зображення
- Кнопка “Зберегти історію”
- Блок “Popular” з рекомендованими статтями

### 🌍 Travellers (`/travellers`)

- Список мандрівників (фото, ім’я, опис)
- Кнопка “Переглянути профіль”

### 👤 Traveler Profile (`/travellers/[travellerId]`)

- Інформація про мандрівника
- Його історії або повідомлення _“Цей користувач ще не публікував історій”_

### 🔐 Profile (`/profile`)

- Інформація про користувача
- Перемикачі: “Збережені історії” / “Мої історії”
- Кнопка “Редагувати профіль”
- Списки історій або повідомлення про відсутність контенту

### ✏️ Edit Profile (`/edit`)

- Сторінка редагування профілю мандрівника
- Форма з полями: ім’я, email, фото, додаткова інформація
- Валідація через Formik + Yup
- Підтримка зміни email з відправкою верифікаційного листа

### ➕ Add Story (`/new-story`)

- Форма створення історії: обкладинка, назва, категорія, текст
- Валідація (Formik + Yup)
- Редірект у профіль після успішного створення

### 🔑 Auth (`/auth/login`, `/auth/register`)

- LoginForm / RegistrationForm
- Валідація даних та повідомлення про помилки

---

## 📌 Roadmap

### ✅ MVP (готово)

- [x] Адаптивна верстка (320px / 768px / 1440px)
- [x] Публічні та приватні маршрути
- [x] Авторизація та робота з токенами
- [x] CRUD для історій
- [x] Профіль користувача
- [x] Пагінація списків (історії, мандрівники)
- [x] Лоадери, скелетони, тости
- [x] Редагування профілю
- [x] Створення історії

### 🚀 Planned

- [ ] Інтеграція **React Query** для кешування та інвалідації даних
- [ ] Верифікація email при зміні пошти
- [ ] Темна тема (згідно UI-kit)
- [ ] Коментарі до історій
- [ ] Система рейтингів / лайків
- [ ] Фільтрація та пошук історій
- [ ] Мультимовність (**i18n**)
- [ ] **PWA** (офлайн-режим та встановлення як застосунок)

---

## ⚙️ Встановлення та запуск

```bash
# 1. Клонувати репозиторій
git clone https://github.com/vitalii-mieliet/plantains-app-client.git

# 2. Перейти в директорію
cd plantains-app-client

# 3. Встановити залежності
npm install

# 4. Запустити у режимі розробки
npm run dev

# 5. Зібрати білд
npm run build

# 6. Запустити лінтер
npm run lint
```
