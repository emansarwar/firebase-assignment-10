import app from './firebase.config'
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';



const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  // const user = result.user;
  // setUser(user);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
  .catch(error => {
        console.error('error', error)
      })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }


  
  return (
    <div className="App">

      {
        user.uid ?
          <button onClick={handleGoogleSignOut}>Google Sign Out</button> :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </>
      }
      <br />
      <h2> Name :{user.displayName}</h2>
      <h2> Email :{user.email}</h2>


    </div>
  );
}

export default App;
