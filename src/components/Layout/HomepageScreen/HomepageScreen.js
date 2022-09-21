import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import classes from "./HomepageScreen.module.scss";

const HomepageScreen = () => {
    const {user} = useSelector(state => state.authReducer);
    const navigate = useNavigate();
    return <Box className={classes.box}>
        <Stack direction="column" className={classes.box}>
            <img className={classes.homepageIMG} src={'https://basmo.app/wp-content/uploads/2021/08/benefits-of-reading-books.jpg'}/>
            <Typography variant="h4" sx={{maxWidth: '400px', margin: '30px'}}>Discover weekly, the best new books</Typography>
            <Typography variant="h5">Save your favourite books!</Typography>
            <Typography variant="h5">Discover new books and authors!</Typography>
            <Typography variant="h5">Share your opinion with other users!</Typography>
            {!user && <Button variant="contained" sx={{margin: '25px', borderRadius: '25px'}} onClick={() => navigate('/register')}>Sign up</Button>}
        </Stack>
    </Box>

    // return <Grid container columns={{xs: 12, sm: 12, md: 12}}>
    //     <Grid item xs={12} sm={12} md={4} className={classes.box}>
    //         <img className={classes.homepageIMG} src={'https://basmo.app/wp-content/uploads/2021/08/benefits-of-reading-books.jpg'}/>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={8}>
    //         <Stack direction="column" className={classes.box}>
    //             <Typography variant="h3">Welcome!</Typography>
    //             <Typography variant="h4">Find your favourite books here!</Typography>
    //         </Stack>
    //     </Grid>
    // </Grid>
}

export default HomepageScreen;