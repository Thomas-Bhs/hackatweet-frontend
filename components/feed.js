import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Feed() {

  const [newTweet, setNewTweet] = useState('');
  const [tweets, setTweets] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  }, []);

  const handleTweet = () => {
    if (!newTweet.trim()) return;
  
    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newTweet })   
    })
      .then(res => res.json())
      .then(data => {
        console.log('Réponse POST /tweets :', data);

        if (data.result && data.tweet) {           
          setTweets(prev => [data.tweet, ...prev]); 
          setNewTweet('');
        }
      });
  };

  return (
    <div>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Post les tweets ici !
          </h1>

          <input
            className='tweet-input'
            type="text"
            placeholder="Tweet.."
            value={newTweet}
            onChange={e => setNewTweet(e.target.value)}
          />
          <button className='tweeter' onClick={handleTweet}>
            Tweeter
          </button>
        </div>


      </main>
    </div>
  );
}
