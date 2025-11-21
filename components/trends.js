import styles from '../styles/Trends.module.css';

export default function Trends({ trends = [], activeTag = null, onSelectTrend }) {
  if (!trends.length) return null;

  const handleSelect = (tag) => {
    if (onSelectTrend) onSelectTrend(tag);
  };

  return (
    <aside className={styles.trends}>
      <h2 className={styles.title}>Trends</h2>

      <div className={styles.list}>
        {trends.map((trend) => (
          <button
            key={trend.tag}
            className={`${styles.item} ${activeTag === trend.tag ? styles.active : ''}`}
            onClick={() => handleSelect(trend.tag)}
            type="button"
          >
            <span className={styles.tag}>{trend.tag}</span>
            <span className={styles.count}>
              {trend.count} Tweet{trend.count > 1 ? 's' : ''}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
