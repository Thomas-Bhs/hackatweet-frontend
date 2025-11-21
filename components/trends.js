import styles from '../styles/Trends.module.css';

export default function Trends({ trends = [] }) {
  if (!trends.length) return null;

  return (
    <aside className={styles.trends}>
      <h2 className={styles.title}>Trends</h2>

      <div className={styles.list}>
        {trends.map((trend) => (
          <div key={trend.tag} className={styles.item}>
            <span className={styles.tag}>{trend.tag}</span>
            <span className={styles.count}>
              {trend.count} Tweet{trend.count > 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
