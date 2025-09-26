// Заглушка. Імітує успішний бекенд.
// Пізніше просто замініть на RTK Query або fetch.
export async function submitOnboarding({ bio = '', avatarFile = null }) {
  await new Promise((r) => setTimeout(r, 500));
  // повертаємо те, що міг би повернути бекенд
  return {
    user: {
      id: 'mock',
      bio,
      avatarUrl: avatarFile ? URL.createObjectURL(avatarFile) : null,
      onboardingCompleted: true,
    },
  };
}

// У проді не використовувати URL.createObjectURL з файлом із форми як “аватарUrl”; це лише для демо.
// На справжньому бекенді ви отримаєте реальну URL.
