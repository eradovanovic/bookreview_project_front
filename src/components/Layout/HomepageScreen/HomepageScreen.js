import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {Button, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import classes from "./HomepageScreen.module.scss";

const HomepageScreen = () => {
    const {user} = useSelector(state => state.authReducer);
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSM= useMediaQuery(theme.breakpoints.up('sm'));

    let height;
    if (matchesMD) {
        height = '500px';
    }
    else if (matchesSM) {
        height = '600px';
    }
    else {
        height = '650px';
    }

    return <Box className={classes.box} height={height}>
        <Stack direction="column" className={classes.box} height={height}>
            <img className={classes.homepageIMG} src={'https://basmo.app/wp-content/uploads/2021/08/benefits-of-reading-books.jpg'}/>
            <Typography variant="h4" sx={{maxWidth: '350px', margin: '30px'}}>Discover the best new books</Typography>
            <Typography variant="h5" sx={{marginX: '10px'}}>Save your favourite books!</Typography>
            <Typography variant="h5" sx={{marginX: '10px'}}>Discover new books and authors!</Typography>
            <Typography variant="h5" sx={{marginX: '10px'}}>Share your opinion with other users!</Typography>
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