import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import bookIMG from "../../assets/images/book_thumbnail.jpeg"

import classes from "./BookDetails.module.scss";

const BookDetails = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center'}}>
                    <img src={bookIMG} width='50%' alt="Book Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={8} sx={{textAlign:'center'}}>
                    <Typography variant="h4">Book title</Typography>
                    <Typography variant="h6">Book author</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                        quasi quidem quibusdam.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookDetails;