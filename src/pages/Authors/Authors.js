import { useEffect, useState } from "react";
import { ListItem, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import api from "services/api/api";
import { AUTHORS_PER_PAGE } from "constants/constants";
import Author from "components/Author";
import classes from "./Authors.module.scss";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.getAuthors(page).then((res) => {
      setAuthors(res.authors);
      setTotalPages(Math.ceil(res.total / AUTHORS_PER_PAGE));
    });
  }, [page]);

  const pageHandler = (event, value) => {
    setPage(value);
    api.getAuthors(page).then((res) => {
      setAuthors(res.authors);
    });
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          height: { md: 700, sm: 700, xs: 670 },
        }}
      >
        <List sx={{ minWidth: "80%" }}>
          <ListItem>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Authors
            </Typography>
          </ListItem>
          <Divider />
          {authors.map((author) => (
            <Author key={author.id} author={author} />
          ))}
        </List>
      </Box>
      {authors && authors.length > 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Pagination count={totalPages} page={page} onChange={pageHandler} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Authors;
