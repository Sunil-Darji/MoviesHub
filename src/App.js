import React,{useState,useEffect} from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Series from './Pages/Series/Series'
import Search from './Pages/Search/Search1'
import Error from './Error'
import './App.css'
import Fire from './Firebase/Fire'
import Login from './Firebase/Login'
import Header from './Header'
const App1 = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };
    const handleLogin = () => {
        clearErrors();
        Fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                        default: 
                }
            });
    };
    const handleSignin = () => {
        clearErrors();
        Fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                        default:  
                }
            });
    };
    const handleLogout = () => {
        Fire.auth().signOut();
    };
    const authListener = () => {
        Fire.auth().onAuthStateChanged((user) => {
                if (user) {
                    clearInputs();
                    setUser(user);
                } else {
                    setUser('');
                }
            });
    };
    useEffect(() => {
        authListener();
    },);
    return (
        <>
            {user ? (
                <>
                <Header handleLogout={handleLogout}/>
                <BrowserRouter>
                  <Switch>
                    <Route path="/" component={Trending} exact />
                    <Route path="/movies" component={Movies} exact />
                    <Route path="/series" component={Series} exact />
                    <Route path="/search" component={Search} exact />
                    <Route component={Error}></Route>
                  </Switch>
                </BrowserRouter>
              </>
                ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignin={handleSignin}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}
        </>
    )
}

export default App1
