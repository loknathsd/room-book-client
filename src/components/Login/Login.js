import React, { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {UserContext} from '../../App'
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory()
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogle = () => {
        console.log('google sign in clicked')
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                  const {displayName,email} = result.user;
                  const signInUser = {name : displayName,email}
                
                setLoggedInUser(signInUser);
                handleToken();
                console.log(signInUser)
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    const handleToken = ()=>{
        const auth = getAuth();
        auth.currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token',idToken);
          })
          .catch(function(error) {
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogle}>Google SignIn</button>
        </div>
    );
};

export default Login;