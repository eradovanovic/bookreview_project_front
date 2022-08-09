import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchBook} from "store/books/booksActions";
import classes from "./BookDetails.module.scss";


const BookDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const currentBook = useSelector((state) => state.booksReducer.currentBook);
    const {title, author, description, photo} = currentBook;


    useEffect(() => {
        if(id != null){
            fetchBook(id, dispatch);
        }
    }, [dispatch, id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center'}}>
                    <img src={photo} width='50%' alt="Book Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={8} sx={{textAlign:'center'}}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h6">{author}</Typography>
                    <Typography variant="body1">
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookDetails;