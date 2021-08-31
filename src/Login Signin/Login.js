import React from 'react'
import { Link } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import B2H from './B2H'
import './signlogin.css'
const Login = () => {
    return (
        <Grid className="root_style">
            <B2H />
            <Paper elevation={10} className="paper">
                <Grid align='center'>
                    <Avatar className="avatar"><AccountBoxIcon /></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField variant="outlined" label='Username' placeholder='Enter username' fullWidth required />
                <br />
                <br />
                <TextField variant="outlined" label='Password' placeholder='Enter password' type='password' fullWidth required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" className="btn_style" fullWidth>Log In</Button>
                <Typography >
                    <Link to='/login'>
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Don't have an account?
                    <Link to='/signin'>
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login