import { useSolancerContract } from '@hooks/useSolancerContract';
import { useState } from 'react';

import style from '../styles/Signup.module.scss';

export const Signup: IComponent = () => {
  const [username, setUserName] = useState('');
  const [profile, setProfile] = useState('');
  const [role, setRole] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  const { signup } = useSolancerContract();

  const signUpClicked = () => {
    signup(username, profile, role, cvUrl);
    console.log('Success');
  };

  return (
    <div className={style.authContainer}>
      <h1 className={style.title}>Sign up to use Solancer</h1>
      <div className={style.signupForm}>
        <div className={style.inputField}>
          <div className={style.inputTitle}>Username:</div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        <div className={style.inputField}>
          <div className={style.inputTitle}>Profile Image:</div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
        </div>

        <div className={style.inputField}>
          <div className={style.inputTitle}>Role:</div>
          <div className={style.inputContainer}>
            <input className={style.input} type="text" onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>

        <div className={style.inputField}>
          <div className={style.inputTitle}>CV URL:</div>
          <div className={style.inputContainer}>
            <input className={style.input} type="text" onChange={(e) => setCvUrl(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={style.loginButton} onClick={signUpClicked}>
        Sign up
      </div>
    </div>
  );
};
