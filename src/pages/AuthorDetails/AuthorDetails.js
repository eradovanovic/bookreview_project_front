import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthor} from "store/authors/authorsActions";
import classes from "./AuthorDetails.module.scss";

const AuthorDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentAuthor = useSelector((state) => state.authorsReducer.currentAuthor);

    const {name, surname, biography, photo} = currentAuthor;

    useEffect(()=>{
        if(id != null ) {
            fetchAuthor(id, dispatch);
        }
    }, [dispatch, id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center'}}>
                    <img src={photo} width='50%' alt="Author Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={8} sx={{textAlign:'center'}}>
                    <Typography variant="h4">{name} {surname}</Typography>
                    <Typography variant="body1">
                        {biography}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AuthorDetails;