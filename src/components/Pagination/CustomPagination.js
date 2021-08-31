import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from '@material-ui/core'
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});
const CustomPagination=({ setPage, numOfPages = 10 }) =>{
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  const {root}=useStyle();
  return (
    <div className={root}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}

const useStyle = makeStyles({
  root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
  }, 
});
export default CustomPagination