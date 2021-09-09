import { useEffect, useState, useContext } from "react";
import { createTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import "./Search1.css";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Footer from '../../Footer'
import axios from "axios";
import { ListContext } from '../../ListContext'

const Search = ({ user }) => {
    const { list } = useContext(ListContext);
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    }); 
    
    useEffect(() => {
        let disposed = false;

        (async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            )

            if (disposed) return
            setContent(data.results);
            setNumOfPages(data.total_pages);
        })()

        return () => disposed = true
    }, [type, page, content, searchText]);
    return (
        <div className="app">
            <ThemeProvider theme={darkTheme}>
                <TextField
                    className="search"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => { setSearchText(e.target.value); }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    className="tabs"
                    aria-label="disabled tabs example"
                >
                    <Tab className='tab' label="Searched Movies" />
                    <Tab className='tab' label="Searched TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="middle">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                            user={user}
                            bol={!list.has(c.id)}
                        />
                    ))}
                {!content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
            <Footer />
        </div>
    );
};

export default Search;
