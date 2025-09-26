import styles from './OnboardingPage.module.css';
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm';

export default function OnboardingPage() {
  // onSuccess — колбек, який ПІЗНІШЕ можна підвʼязати до navigate('/profile') або dispatch(...)
  const handleSuccess = (data) => {
    console.log('Onboarding completed (stub):', data);
    // TODO: navigate('/profile') або оновити Redux — коли будете готові
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Давайте познайомимось ближче</h1>

      <div className={styles.card}>
        <OnboardingForm styles={styles} onSuccess={handleSuccess} />
      </div>

      <footer className={styles.footer}>© 2025 Подорожники</footer>
    </main>
  );
}
