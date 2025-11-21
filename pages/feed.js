import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import TweetInput from '../components/tweetInput';
import Tweet from '../components/tweet';
import Trends from '../components/trends';
import styles from '../styles/Feed.module.css';

export default function FeedPage() {
  const [newTweet, setNewTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [trends, setTrends] = useState([]);

  const recomputeTrends = (list) => {
    const counts = new Map();
    list.forEach((t) => {
      const matches = typeof t.content === 'string' ? t.content.match(/#([\p{L}\p{N}_]+)/gu) : null;
      if (!matches) return;
      matches.forEach((rawTag) => {
        const tag = rawTag.toLowerCase();
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    const sorted = Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
    setTrends(sorted);
  };

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
              // fallback: extract timestamp from MongoDB ObjectId to avoid "à l'instant"
              new Date(parseInt(t._id.substring(0, 8), 16) * 1000).toISOString(),
          }));
          setTweets(normalized);
          recomputeTrends(normalized);
        }
      });
  }, []);


  const handleTweet = () => {
    if (!newTweet.trim() || newTweet.length > 280) return;

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
          setTweets((prev) => {
            const next = [tweetWithDate, ...prev];
            recomputeTrends(next);
            return next;
          });
          setNewTweet('');
        }
      });
  };


  return (
    <div className={styles.app}>
      <Sidebar />

      <main className={styles.mainColumn}>
        <section className={styles.inputSection}>
          <h1 className={styles.headerTitle}>Home</h1>
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

      <Trends trends={trends} />
    </div>
  );
}
