import { useContext, useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Footer from "../../Footer";
import './Wishlist.css'
import { ListContext } from '../../ListContext'
const Wishlist = ({ user }) => {
    const { list } = useContext(ListContext);
    const [content, setContent] = useState([]);
    useEffect(() => {
        var temp = [];
        list.forEach((c) => {
            temp.push(c);
        })
        setContent(temp);
    }, [list, content]);
    return (
        <div className="app">
            <span className="pageTitle">Wishlist</span>
            <div className="middle">
                {list.size ?
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster}
                            title={c.title}
                            date={c.date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                            user={user}
                            bol={!list.has(c.id)}
                        />
                    )) : (
                        <div className="no-files">
                            <FileCopyIcon fontSize="large" />
                            <div className="empty">No Files</div>
                        </div>
                    )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
