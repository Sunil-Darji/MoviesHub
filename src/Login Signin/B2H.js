import React from 'react'
import { Link } from "react-router-dom";
import { Button, makeStyles } from '@material-ui/core'
const B2H = () => {
    const { link, btnstyle} = useStyle();
    return (
        <>
            <Link to="/" className={link}>
                <Button variant="contained" className={btnstyle}>Back to Home</Button>
            </Link>
        </>
    )
}
const useStyle = makeStyles({
    link: {
        color: '#d5d5d5'
    },
    btnstyle: {
        marginTop: '1rem',
        marginLeft: '0.5rem',
    },
});
export default B2H
