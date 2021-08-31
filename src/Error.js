import React from 'react'
import B2H from '../src/Login Signin/B2H'
import { makeStyles } from '@material-ui/core/styles';
const Error = () => {
    const {title}=useStyles();
    return (
        <>
        <B2H/>
         <h1 className={title}>Page Not Found</h1> 
         <h1 className={title}>Error 404</h1> 
        </>
    )
}

const useStyles = makeStyles(() => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: 'lighter',
        fontSize: '3rem',
    } 
}));
export default Error
