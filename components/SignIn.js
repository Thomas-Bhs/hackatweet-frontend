import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';
import styles from '../styles/SignIn.module.css';

function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleConnection = () => {
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const finalUsername = data.username || signInUsername;
          if (typeof window !== 'undefined') {
            const currentUser = {
              firstName: data.firstName || '',
              username: finalUsername,
              token: data.token,
              avatarUrl: data.avatarUrl || null,
            };
            window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }
          dispatch(login({ username: finalUsername, token: data.token }));
          setSignInUsername('');
          setSignInPassword('');
          router.push('/feed');
        }
      });
  };

  const userRedux = useSelector((state) => state.user.value);
  console.log('USER IN REDUX:', userRedux);

  return (
    <div className="modal-signup">
      <div className={styles.SignIncontent}>
        <p>Sign In</p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signInUsername}
          onChange={(e) => setSignInUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
        />
        <button type="button" onClick={handleConnection}>Connection</button>
      </div>
    </div>
  );
}

export default SignIn;
