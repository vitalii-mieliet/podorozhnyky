### Покращення

## AppButton

- Зараз ви перевіряється тільки http, але варто врахувати ще https. Можна зробити більш універсально:
  <!-- if (href && /^https?:\/\//.test(href)) {
  commonProps.rel = 'noopener noreferrer';
  } -->
- Для <a> з aria-disabled добре було б додати tabIndex={-1}, щоб вимкнене посилання не було фокусованим:
 <!-- <a
  href={disabled ? undefined : href}
  aria-disabled={disabled}
  tabIndex={disabled ? -1 : undefined}
  ...
> -->

## Утиліти

- дати

## Інші завдання

- README
- OpenGraph + SEO
- ErrorBundler
- PWA

## Промт для код-ревью

Виконуй роль досвідченого розробника, тімліда та техліда.  
Моє завдання: провести професійний код-рев’ю з урахуванням ТЗ.

Флоу роботи та вимоги:

1. Я надам додаткові вимоги з ТЗ (спочатку).
2. Потім я скину код (один чи кілька компонентів/файлів).
3. Після цього зроби детальне код-рев’ю українською мовою.

Аналізуй за критеріями:

- Семантика (чи правильні теги, структура, ієрархія заголовків, списки, article/section).
- Адаптивність (коректність відсоткових значень, max-width, гріди, флекси, медіа-запити).
- Доступність (alt для зображень, aria-атрибути, ролі елементів, фокус, кнопки з іконками).
- Логіка (організація state, props, ключі у списках, валідація даних).
- Стилі (оптимізація, уникнення дублювання, правильність для CSS Modules/Sass, назви класів).
- Компонентність (розділення відповідальностей, можливість перевикористання).
- Відповідність вимогам ТЗ (що реалізовано, що пропущено або суперечить).
- Якість коду загалом (читабельність, best practices, зрозумілість для команди).

У форматі відповіді:

1. ✅ Що зроблено добре.
2. ⚠️ Що треба виправити (з прикладами, якщо можна).
3. 🔧 Рекомендації (best practices, поради для покращення).
4. Короткий підсумковий висновок у 2–3 речення.

Відповідь завжди давай українською.
Act as a senior developer, team lead, and tech lead.  
Your task: perform a professional code review considering the technical specification (TS).

Workflow & Requirements:

1. I will provide additional requirements from the TS (first).
2. Then I will share the code (one or multiple components/files).
3. After that, perform a detailed code review in English.

Analyze the code using these criteria:

- Semantics (correct use of tags, structure, heading hierarchy, lists, article/section).
- Responsiveness (proper use of percentages, max-width, grids, flexbox, media queries).
- Accessibility (alt attributes for images, aria attributes, roles, focus management, icon buttons).
- Logic (state management, props usage, list keys, data validation).
- Styles (optimization, avoiding duplication, correct use of CSS Modules/Sass, class naming).
- Componentization (separation of concerns, reusability).
- Compliance with the TS (what is implemented, what is missing, what contradicts the requirements).
- Overall code quality (readability, best practices, team-friendliness).

Response format:

1. ✅ What is done well.
2. ⚠️ What needs to be fixed (with examples if possible).
3. 🔧 Recommendations (best practices, improvement advice).
4. A short summary (2–3 sentences) highlighting:
   - what is correct,
   - what should be fixed first,
   - what could be improved.

////////////////////////////////////////////////////////////////

Питання на мітинг
Орагнізаційні

- хто скільки часу зможе виділити
- флоу:
  - окрема гілка для фічі
  - резолв код-ревью
  - коміти

- проєкт:
  - JSDocs
  - бібліотеки
  - проблеми з фічею - що робити
  - Що залишилось по UI
  - Логіка роботи з сервером
    - Основне:
      - Сторінка - контроллер
      - Слайси ()
      - isOwner ( для карточкиІсторії/Мандріники)
      - фільтри (слайс/URL SearchParams)
      - перевірки
  - Стейт
    - Які слайси/Операції/Селектори
    - струкрта слайсів
    - Сторейдж
  - Сторінки (контроллери)
    - Iсторії
    - Мандрівники
    - Аутентифікація/Авторизація
    - Додавання/Редагування історії
    - Редагування профілю

  - що в першу чергу
  - розподіл

- утиліти:
  - обробка помилок (поідомлення, тостер)
  -

## Stories

# toriesSlice:

- Додати обробку action.error.message у випадку відсутності payload.
- Створити хелпер для нормалізації відповіді API, щоб не дублювати payload.data.data.
- Чітко визначити бізнес-логіку для оновлення items і currentStory при pending.

# storiesOps

- Повернення лише error.message при rejectWithValue обмежує інформативність. Axios помилки часто мають error.response?.data (корисно для валідаційних повідомлень).
- У fetchAllStories і fetchStoryById повертається response.data, але в slice ви працюєте з action.payload.data та навіть action.payload.data.data. Це може спричинити плутанину. Немає єдиної точки нормалізації.
- Немає таймауту чи скасування запиту (можна використати AbortController, який підтримує axios).
- Типи даних (структура відповіді) не описані навіть у вигляді JSDoc.
- Додати обробку error.response?.data і повертати більш корисну інформацію, ніж просто message.-
  Зробити нормалізацію даних прямо у thunk або в окремому утилі, щоб slice завжди отримував стабільний формат (items, story).
- Використати signal із thunkAPI для підтримки відміни запитів (Redux Toolkit має вбудовану інтеграцію).
- Додати коротку документацію у JSDoc про структуру очікуваної відповіді API ({ data: Story[] }, { data: Story }).

# StoriesPage

- При isLoading можна додати aria-busy="true" на секцію, щоб підвищити доступність.
- Повідомлення про помилку (<p>Виникла помилка: {error}</p>) краще винести у styled-компонент або додати стилізацію через CSS Module.
- Зараз дані запитуються завжди при кожному відвідуванні сторінки. Якщо користувач повернеться назад, відбудеться повторний запит. Можливо, варто додати кешування (перевірка, чи stories вже є).
- Додати if (!stories.length && !isLoading) перед dispatch(fetchAllStories()), щоб не робити дублюючих запитів.
- Винести логіку завантаження в custom hook useStories, щоб спростити компонент.
- Для повідомлень про помилки варто передбачити fallback (наприклад, кнопка "Спробувати ще раз").
- У плані доступності варто додати aria-busy="true" на контейнер під час завантаження.
- Додати fallback для випадку, коли currentStory не знайдено.
- Створити компонент ErrorMessage із кнопкою “Назад” або “Спробувати ще раз”.
- Винести бізнес-логіку (fetch + стани) у custom hook useStory, щоб зробити компонент більш декларативним.
