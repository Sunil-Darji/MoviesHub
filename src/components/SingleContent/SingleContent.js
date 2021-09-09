import { useState, useEffect, useContext } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import AddOutlinedIcon from '@material-ui/icons/Add'
import YouTubeIcon from '@material-ui/icons/YouTube';
import DeleteIcon from '@material-ui/icons/Delete'
import axios from "axios";
import { ListContext } from '../../ListContext'
import instance from "./instance";
const SingleContent = ({ id, poster, title, date, media_type, vote_average, user, bol }) => {
  const { list, setList } = useContext(ListContext);
  const [video, setVideo] = useState();
  const movie = { id: id, poster: poster, title: title, date: date, media_type: media_type, vote_average: vote_average }
  // ------------------ add a movie into wishlist ------------------------
  const addMovie = async () => {
    instance.post(`${user.uid}.json`, movie).then((response) => {
      movie["fireid"] = response.data.name;
      setList(list.set(id, movie));
    })
  };

  // ------------------ delete a movie into wishlist ------------------------
  const removeMovie = async () => {
    let fireid = "g";
    for (let [key, value] of list) {
      if (key === id) fireid = value.fireid;
    }
    list.delete(id);
    setList(list);
    await axios.delete(
      `${process.env.REACT_APP_FIREBASE_DATABASE_URL}${user.uid}/${fireid}.json`
    );
  };

  // ------------------ fatch video link ------------------------
  useEffect(() => {
    let disposed = false;
    (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
  
      if (disposed) return
      setVideo(data.results[0]?.key);
    })()
  
    return () => disposed = true
  });
  return (
    <div className="media">
      {/* <ContentModal media_type={media_type} id={id}> */}
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <div className="details">
        <div className="rating">
          <StarIcon fontSize="small" />
          {vote_average}
        </div>
        <div className="title">
          {title.length > 25 ? (title.substring(0, 22)) + "..." : title} ({date ? (date.substring(0, 4)) : "****"})
        </div>
        {
          bol ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="btn-wish"
              onClick={()=> addMovie()}
              startIcon={<AddOutlinedIcon />}>
              Watchlist
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              className="btn-wish remove"
              onClick={()=> removeMovie()}
              startIcon={<DeleteIcon />}>
              Remove
            </Button>
          )
        }
        <Button
          variant="contained"
          color="secondary"
          target="__blank"
          fullWidth
          className="btn-wish"
          startIcon={<YouTubeIcon />}
          href={`https://www.youtube.com/watch?v=${video}`}>
          Trailer
        </Button>
      </div>
      {/* </ContentModal> */}
    </div >
  );
};

export default SingleContent;
