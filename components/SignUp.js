import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';




function SignUp() {

  const dispatch = useDispatch();
  //redirection 
  const router = useRouter();


  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleRegister = () => {
    console.log('CLICK REGISTER ✅');

		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
      firstname: signUpFirstname,
      username: signUpUsername,
      password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
          console.log('Backend response:', data);
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpPassword('');

          //redirection sur la page feed après inscription
          router.push('/feed');
				}
			});
	};

  const userRedux = useSelector(state => state.user.value);
console.log("USER IN REDUX:", userRedux);

  return (
    <div className="modal-signup">
      <div className={styles.SignUpcontent}>
        <p>Sign Up</p>
        <input
        type="text"
        placeholder="firsname"
        name="firstname"
        value={signUpFirstname}
        onChange={(e) => setSignUpFirstname(e.target.value)}
        />
        <input
        type="text"
        placeholder='Username'
        name="username"
        value={signUpUsername}
        onChange={(e) => setSignUpUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder='Password'
        name="password"
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );

}

export default SignUp;