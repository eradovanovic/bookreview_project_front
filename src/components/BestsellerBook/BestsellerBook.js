import * as React from "react";
import PropTypes from 'prop-types';
import {Button, Chip, Paper, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EastIcon from '@mui/icons-material/East';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import {DEFAULT_BOOK_PHOTO} from "constants/constants";
import classes from "./BestsellerBook.module.scss";

const BestsellerBook = ({book}) => {
    const {id, title, author, photo, description, rank, rank_last_week, weeks_on_list } = book;

    return <Paper elevation={5} className={classes.paperStyle} sx={{margin:'15px', borderRadius:'15px', maxWidth:'800px'}}>
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }} alignItems="center">
            <Grid item xs={6} sm={6} md={6} >
                <Typography variant="h4">{rank}.</Typography>
            </Grid>
            {!!rank_last_week && rank !== rank_last_week && <Grid item xs={6} sm={6} md={6} justifyContent="flex-end">
                <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-end">
                    {
                        rank < rank_last_week || !rank_last_week ?
                        <NorthIcon sx={{color: 'green'}}/> :
                        <SouthIcon sx={{color: 'red'}}/>
                    }
                    <Typography variant="subtitle1"
                                sx={{color: rank - rank_last_week < 0 || !rank_last_week ? 'green' : (rank - rank_last_week > 0 ? 'red' : '')}}>{rank < rank_last_week || !rank_last_week ? '+' : ''}{rank_last_week ? rank_last_week - rank : 16 - rank}</Typography>
                </Stack>
            </Grid>}
        </Grid>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center', padding:'0px'}}>
                <Button sx={{maxWidth:'150px', margin:'0px', padding:'0px'}}>
                    <img className={classes.thumbnailIMG} src={photo ? photo : DEFAULT_BOOK_PHOTO} width="100%" alt="BestsellerBook Thumbnail"/>
                </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={8} height="100%" alignItems="center" justifyContent="center" paddingTop="15px" >
                <Box className={classes.paperStyle}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle2" sx={{paddingBottom: '15px'}}>{author}</Typography>
                    <Chip size="small" sx={{marginRight: '5px'}} label={weeks_on_list > 1 ? `${weeks_on_list} weeks on the list` : 'New this week'} variant="outlined" />
                    { !!rank_last_week &&
                        <Chip size="small" sx={{marginRight: '5px'}}
                           label={`Last week rank: ${rank_last_week !== 0 ? rank_last_week : 'none'}`}
                           variant="outlined"/>
                    }
                    <Typography variant="subtitle1" sx={{paddingTop: '5px'}}>{description}</Typography>
                </Box>
            </Grid>
        </Grid>
    </Paper>
}

BestsellerBook.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
    }),
    type: PropTypes.string.isRequired,
    getCollection: PropTypes.func
}

export default BestsellerBook;
