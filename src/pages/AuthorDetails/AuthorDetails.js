import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthor} from "store/authors/authorsActions";
import classes from "./AuthorDetails.module.scss";
import {Chip, Link, ListItem, Paper, Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Review from "../../components/Review";

const AuthorDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentAuthor = useSelector((state) => state.authorsReducer.currentAuthor);

    const {name, surname, biography, photo} = currentAuthor;

    useEffect(()=>{
        if(id != null ) {
            dispatch(fetchAuthor(id));
        }
    }, [dispatch, id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={3} height='100%' sx={{textAlign:'center'}}>
                    <img className={classes.thumbnailIMG} src={photo} width='100%' alt="Book Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={9} alignItems="center" justifyContent="center" height='100%' sx={{textAlign:'center', height: '100%'}}>
                    <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                        <Typography variant="h6">{name} {surname}</Typography>
                        <Typography variant="body1">
                            {biography}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12} md={12}>
                        <List>
                            <ListItem>
                                <Typography variant="h6" sx={{textAlign:'center'}}>Books</Typography>
                            </ListItem>
                            <Divider/>

                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AuthorDetails;