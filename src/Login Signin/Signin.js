import React from 'react'
import { Link } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import B2H from './B2H'
import './signlogin.css'
const Signin = () => {
    return (
        <Grid className="root_style">
            <B2H />
            <Paper elevation={10} className="paper">
                <Grid align='center'>
                    <Avatar className="avatar"><AccountBoxIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField variant="outlined" label='Username' placeholder='Enter username' fullWidth required />
                <br />
                <br />
                <TextField variant="outlined" label='Email' placeholder='Enter Email Id' type='email' fullWidth required />
                <br />
                <br />
                <TextField variant="outlined" label='Password' placeholder='Enter password' type='password' fullWidth required />
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                /> */}
                <Button type='submit' color='primary' variant="contained" className="btn_style" fullWidth>Sign In</Button>
                <Typography > Do you have an account?
                    <Link to="/login">
                        Log In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signin