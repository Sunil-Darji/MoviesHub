import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import img from '../../Images/404.png'
import Footer from '../../Footer'
const Error = () => {
    const { title, imgStyle, container } = useStyles();
    return (
        <>
        <div className={container}>
            <img src={img} alt="img" className={imgStyle}></img>
            <div className={title}>
                <h1>Page Not Found</h1>
                <p>Sorry, but we can't find the page you are looking for...</p>
            </div>
        </div>
        <Footer/>
        </>
    )
}

const useStyles = makeStyles(() => ({
    title: {
        width: '400px',
    },
    imgStyle: {
        width: '150px',
        height: '140px',
    },
    container: {
        minHeight: '70vh',
        textAlign: 'center',
        display: 'flex',
        FlexDirection: 'column',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.3rem',
    }
}));
export default Error
