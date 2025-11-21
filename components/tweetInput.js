import styles from '../styles/TweetInput.module.css';

export default function TweetInput({ newTweet, setNewTweet, onTweet }) {
  const remaining = 280 - (newTweet?.length || 0);

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>

      <div className={styles.main}>
        <textarea
          className={styles.textarea}
          placeholder="What's up?"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          rows={2}
        />

        <div className={styles.footer}>
          <span className={styles.counter}>{remaining}/280</span>
          <button
            className={styles.button}
            onClick={onTweet}
            disabled={!newTweet.trim()}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
