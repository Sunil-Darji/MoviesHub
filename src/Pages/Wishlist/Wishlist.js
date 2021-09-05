import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import axios from "axios";
import Footer from "../../Footer";
import './Wishlist.css'
const Wishlist = ({ user }) => {
    const [list, setList] = useState([]);
    let content = [];
    const fetchWishlist = async () => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_FIREBASE_DATABASE_URL}${user.uid}.json`
        );
        for (let key in data) {
            content.push(data[key]);
        }
        if(content.length>0)
        {
            const uniqueValuesSet = new Set();
            const filteredContent = content.filter((obj) => {
                const isPresentInSet = uniqueValuesSet.has(obj.id);
                uniqueValuesSet.add(obj.id);
                return !isPresentInSet;
              });
            setList(filteredContent);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchWishlist();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="app">
            <span className="pageTitle">Wishlist</span>
            <div className="middle">
                {list.length > 0 ?
                    list.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster}
                            title={c.title}
                            date={c.date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                            user={user}
                            bol={true}
                        />
                    )) : (
                        <div className="no-files">
                            <FileCopyIcon fontSize="large"/>
                            <div className="empty">No Files</div>
                        </div>
                    )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
