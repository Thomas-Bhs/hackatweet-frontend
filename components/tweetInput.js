import { useSelector } from 'react-redux';
import styles from '../styles/TweetInput.module.css';

export default function TweetInput({ newTweet, setNewTweet, onTweet }) {
  const userRedux = useSelector((state) => state.user.value);
  const maxLength = 280;
  const remaining = Math.max(0, maxLength - (newTweet?.length || 0));

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>

      <div className={styles.main}>
        <textarea
          className={styles.textarea}
          placeholder="What's up?"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          rows={2}
        />

        <div className={styles.footer}>
          <span className={styles.counter}>{remaining}/280</span>
          <button
            className={styles.button}
            onClick={() => onTweet(userRedux?.username)}
            disabled={!newTweet.trim() || newTweet.length > maxLength}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
