import { useEffect, useState } from 'react';
import styles from '../styles/Tweet.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fontawesome/free-solid-svg-icons';

function formatRelativeTime(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date)) return '';

  const diffSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    { label: 'an', plural: 'ans', seconds: 31536000 },
    { label: 'mois', plural: 'mois', seconds: 2592000 },
    { label: 'semaine', plural: 'semaines', seconds: 604800 },
    { label: 'jour', plural: 'jours', seconds: 86400 },
    { label: 'h', plural: 'h', seconds: 3600 },
    { label: 'min', plural: 'min', seconds: 60 },
  ];

  for (const unit of units) {
    if (diffSeconds >= unit.seconds) {
      const value = Math.floor(diffSeconds / unit.seconds);
      const label = value > 1 ? unit.plural : unit.label;
      return `il y a ${value} ${label}`;
    }
  }

  return "à l'instant";
}

export default function Tweet({ username, content, createdAt }) {
  const timestamp = createdAt ?? Date.now();
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(timestamp));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setRelativeTime(formatRelativeTime(timestamp));
    const id = setInterval(() => setRelativeTime(formatRelativeTime(timestamp)), 60000);
    return () => clearInterval(id);
  }, [timestamp]);

  const handleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((count) => Math.max(0, count + (next ? 1 : -1)));
      return next;
    });
  };

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
          <button
            className={`${styles.iconButton} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            <span className={styles.heart} aria-hidden="true">
              {/* <FontAwesomeIcon icon={faHeart} /> */}
            </span>
            <span className={styles.likeCount}>{likeCount}</span>
          </button>
        </footer>
      </div>
    </article>
  );
}
