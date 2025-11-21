import { useEffect, useState } from 'react';
import styles from '../styles/Tweet.module.css';

function formatRelativeTime(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date)) return '';

  const diffSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const unit of units) {
    if (diffSeconds >= unit.seconds) {
      const value = Math.floor(diffSeconds / unit.seconds);
      return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export default function Tweet({ username, content, createdAt }) {
  const timestamp = createdAt ?? Date.now();
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(timestamp));

  useEffect(() => {
    setRelativeTime(formatRelativeTime(timestamp));
    const id = setInterval(() => setRelativeTime(formatRelativeTime(timestamp)), 60000);
    return () => clearInterval(id);
  }, [timestamp]);

  return (
    <article className={styles.tweet}>
      <div className={styles.avatar}></div>

      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.displayName}>{username}</span>
          <span className={styles.handle}>@{username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>{relativeTime}</span>
        </header>

        <p className={styles.content}>{content}</p>

        <footer className={styles.footer}>
          <button className={styles.iconButton}>
            ♥ <span className={styles.likeCount}>0</span>
          </button>
        </footer>
      </div>
    </article>
  );
}
