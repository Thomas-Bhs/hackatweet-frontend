import styles from "../styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🐦</span>
      </div>



      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.profileText}>
          <span className={styles.profileName}>John</span>
          <span className={styles.profileHandle}>@JohnCena</span>
        </div>
      </div>
    </aside>
  );
}
