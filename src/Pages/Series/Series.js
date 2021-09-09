import { useEffect, useState,useContext } from "react";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import axios from "axios";
import Footer from "../../Footer";
import { ListContext } from '../../ListContext'

const Series = ({user}) => {
  const {list} = useContext(ListContext);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
 
  useEffect(() => {
    let disposed = false;
  
    (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
  
      if (disposed) return
      setContent(data.results);
    setNumOfPages(data.total_pages);
    })()
  
    return () => disposed = true
  }, [genreforURL, page,content]);
  return (
    <div className="app">
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="middle">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
              user={user}
              bol={!list.has(c.id)}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      <Footer/>
    </div>
  );
};

export default Series;
