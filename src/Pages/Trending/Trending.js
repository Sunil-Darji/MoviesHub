import { useEffect, useState, useContext } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { ListContext } from '../../ListContext'
import axios from "axios";
import Footer from "../../Footer";
const Trending = ({ user }) => {
  const { list } = useContext(ListContext);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
 
  useEffect(() => {
    let disposed = false;
  
    (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
  
      if (disposed) return
      setContent(data.results);
    })()
  
    return () => disposed = true
  },[page,content]);
  return (
    <div className="app">
      <span className="pageTitle">Trending Today</span>
      <div className="middle">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              user={user}
              bol={!list.has(c.id)}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
      <Footer />
    </div>
  );
};

export default Trending;
