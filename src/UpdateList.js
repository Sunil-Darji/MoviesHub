import React, { useContext,useEffect } from 'react'
import { ListContext } from './ListContext'
import axios from 'axios'
const UpdateList = ({user}) => {
    const {list, setList} = useContext(ListContext);
    const fetchWishlist = async () => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_FIREBASE_DATABASE_URL}${user.uid}.json`
        );
        for (let key in data) {
            const xx=data[key];
            xx["fireid"]=key;
            setList(list.set(data[key].id,xx));
        }
    };
    useEffect(() => {
        fetchWishlist();
        // eslint-disable-next-line
    }, []);
    return (
        <>
        </>
    )
}

export default UpdateList


