import styles from "../styles/Sidebar.module.css";

export default function Sidebar({ user }) {
  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const displayName = user?.firstName || 'John';
  const username = user?.username || 'JohnCena';
  const avatarUrl = user?.avatarUrl || null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} onClick={handleLogoClick} role="button" tabIndex={0}>
        <span className={styles.logoIcon}>
          <img src="/images/twitter.png" alt="Hackatweet logo" className={styles.logoImg} />
        </span>
      </div>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${displayName} avatar`} className={styles.avatarImg} />
          ) : null}
        </div>
        <div className={styles.profileText}>
          <span className={styles.profileName}>{displayName}</span>
          <span className={styles.profileHandle}>@{username}</span>
        </div>
      </div>
    </aside>
  );
}
