import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom";

function fun(value, history) {
    if (value === 0) {
        history.push("/");
    } else if (value === 1) {
        history.push("/movies");
    } else if (value === 2) {
        history.push("/series");
    } else if (value === 3) {
        history.push("/search");
    }else if (value === 4) {
        history.push("/wishlist");
    }
}

const Footer = () => {
    const { root, iconStyle } = useStyles();
    const history = useHistory();
    let value = 0;
    return (
        <BottomNavigation value={value} showLabels className={root}
            onChange={(event, newValue) => {
                fun(newValue, history);
            }} >
            <BottomNavigationAction className={iconStyle} label="Trending" icon={<WhatshotIcon />} />
            <BottomNavigationAction className={iconStyle} label="Movies" icon={<MovieIcon />} />
            <BottomNavigationAction className={iconStyle} label="TV Series" icon={<TvIcon />} />
            <BottomNavigationAction className={iconStyle} label="Search" icon={<SearchIcon />} />
            <BottomNavigationAction className={iconStyle} label="Wishlist" icon={<FavoriteIcon />} />
        </BottomNavigation>
    );
}

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
    },
    iconStyle: {
        color: 'white!important',
    }
});

export default Footer;