import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { Link } from 'react-router-dom'
const Header = () => {
    const { title, link, head, btn, logo} = useStyles();
    return (
        <>
            <AppBar position="static" className={head}>
                <Toolbar>
                    <MovieFilterIcon className={logo} />
                    <Typography variant="h6" className={title}>
                        MoviesHub
                    </Typography>
                    <Link to="/login" className={link}>
                        <Button variant="contained" className={btn}>Log In</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
}


const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
        fontSize: '2.5rem',
        fontWeight: '100'
    },
    link: {
        color: '#d5d5d5'
    },
    head: {
        width: '100%',
        backgroundColor: "#2d313a",
        // position: 'fixed',
    },
    btn: {
        // color: 'black',
        backgroundColor: '#e8e3e3de',
        fontWeight: '100',
    },
    logo: {
        fontSize: '2.5rem',
    } 
}));
export default Header;