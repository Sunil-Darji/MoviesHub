import React from 'react'
import './Login.css'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const login = (props) => {
    const { email, setEmail, password, setPassword, handleLogin, handleSignin, hasAccount, setHasAccount, emailError, passwordError } = props;
    return (
        <Grid className="root_style">
            <Paper elevation={10} className="paper">
                <Grid align='center'>
                    <Avatar className="avatar"><AccountBoxIcon /></Avatar>
                    <h2>{hasAccount ? <p>Log In</p> : <p>Sign Up</p>}</h2>
                </Grid>
                <TextField
                    className="textfield"
                    variant="outlined"
                    label='Enter Email Id'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    fullWidth
                    required />
                <p className="errorMsg">{emailError}</p>
                <TextField
                    className="textfield"
                    variant="outlined"
                    label='Enter password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                className="btn_style"
                                onClick={handleLogin}
                                fullWidth>
                                Log In
                            </Button>
                            <p className="span-p">Don't have an account? <span className="span" onClick={() => setHasAccount(!hasAccount)}>sign-up</span></p>
                        </>
                    ) : (
                        <>
                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                className="btn_style"
                                onClick={handleSignin}
                                fullWidth>
                                Sign Up
                            </Button>
                            <p className="span-p">Do have an account? <span className="span" onClick={() => setHasAccount(!hasAccount)}>log-in</span></p>
                        </>
                    )}
                </div>
            </Paper>
        </Grid>
    )
}

export default login
