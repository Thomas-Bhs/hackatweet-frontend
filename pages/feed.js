import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import TweetInput from '../components/tweetInput';
import Tweet from '../components/tweet';
import Trends from '../components/trends';
import styles from '../styles/Feed.module.css';

export default function FeedPage() {

  const [newTweet, setNewTweet] = useState('');
  const [tweets, setTweets] = useState([]);

 
  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then((res) => res.json())
      .then((data) => {
        if (data.result && Array.isArray(data.tweets)) {
          const normalized = data.tweets.map((t) => ({
            ...t,
            createdAt:
              t.createdAt ||
              t.created_at ||
              t.date ||
              t.created ||
              t.timestamp ||
              new Date().toISOString(),
          }));
          setTweets(normalized);
        }
      });
  }, []);


  const handleTweet = () => {
    if (!newTweet.trim()) return;

    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newTweet }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.tweet) {
          const tweetWithDate = {
            ...data.tweet,
            createdAt:
              data.tweet.createdAt ||
              data.tweet.created_at ||
              data.tweet.date ||
              data.tweet.created ||
              data.tweet.timestamp ||
              new Date().toISOString(),
          };
          setTweets((prev) => [tweetWithDate, ...prev]);
          setNewTweet('');
        }
      });
  };


  return (
    <div className={styles.app}>
      <Sidebar />

      <main className={styles.mainColumn}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Home</h1>
        </header>

        <section className={styles.inputSection}>
          <TweetInput
            newTweet={newTweet}
            setNewTweet={setNewTweet}
            onTweet={handleTweet}
          />
        </section>

        <section className={styles.tweetsSection}>
          {tweets.map((t) => (
            <Tweet
              key={t._id}
              username="Antoine"
              content={t.content}
              createdAt={t.createdAt}
            />
          ))}
        </section>
      </main>

      <Trends />
    </div>
  );
}
