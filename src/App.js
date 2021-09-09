import React, { useState, useEffect } from 'react'
import { ListProvider } from './ListContext'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Series from './Pages/Series/Series'
import Search from './Pages/Search/Search1'
import Wishlist from './Pages/Wishlist/Wishlist'
import Error from './components/Error/Error'
import './App.css'
import Fire from './Firebase/Fire'
import Login from './Firebase/Login'
import Header from './Header'
import UpdateList from './UpdateList'
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
    });
    return (
        <>
            {user ? (
                <ListProvider>
                    <UpdateList user={user}/>
                    <Header handleLogout={handleLogout} />
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact > <Trending user={user} /> </Route>
                            <Route path="/movies" exact > <Movies user={user} /> </Route>
                            <Route path="/series" exact > <Series user={user} /> </Route>
                            <Route path="/search" exact > <Search user={user} /> </Route>
                            <Route path="/wishlist" exact > <Wishlist user={user} /> </Route>
                            <Route > <Error /> </Route>
                        </Switch>
                    </BrowserRouter>
                </ListProvider>
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
