import { useState, useEffect } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import AddOutlinedIcon from '@material-ui/icons/Add'
import YouTubeIcon from '@material-ui/icons/YouTube';
import axios from "axios";

const SingleContent = ({ id, poster, title, date, media_type, vote_average, user, bol }) => {
  const [video, setVideo] = useState();
  const addMovie = async (e) => {
    e.preventDefault();
    const movie = {
      id: id,
      poster: poster,
      title: title,
      date: date,
      media_type: media_type,
      vote_average: vote_average,
    }
    const res = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}${user.uid}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(movie),
      }
      );
    }; 
    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    };
    useEffect(() => {
      fetchVideo();
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
          {!bol&&<Button
                variant="contained"
                color="primary"
                fullWidth
                className="btn-wish"
                onClick={addMovie}
                startIcon={<AddOutlinedIcon />}>
                Watchlist
              </Button>
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
      </div>
    );
  };

  export default SingleContent;
