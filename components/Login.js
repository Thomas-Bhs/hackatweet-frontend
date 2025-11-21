import { useState } from 'react';
import styles from '../styles/Login.module.css';
import SignUp from './SignUp';



function Login() {

const [showSignUp, setShowSignUp] = useState(false)


  return (
    <div className={styles.container}>
      
      
      <div className={styles.leftside}>
        <img
          className={styles.image}
          src="/images/Rebranding_Twitter.jpg"
          alt="logo"
          />
      </div>

    <div className={styles.rightside}>
        <div className={styles.content}>
         
          <h1 className={styles.title}>See what’s happening</h1>
          <h3 className={styles.subtitle}>Join Hackatweet today.</h3>

          <button onClick={()=> setShowSignUp(true)} className={styles.signup}>Sign up</button>

          <p className={styles.account}>Already have an account ?</p>

          <button className={styles.signup}>Sign in</button>
        </div>
    </div>

      {/* Pop-up Signup */}
        {showSignUp && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <SignUp/>
            </div>
          </div>
        )}


    </div>
  );
}

export default Login;