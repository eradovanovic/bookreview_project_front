import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ListItem, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import api from "api/api";
import {REVIEW_TYPES} from "constants/constants";
import Stepper from "components/Layout/Stepper";
import Review from "components/Review";
import HomepageScreen from "components/Layout/HomepageScreen";

const Home = () =>{
    const {user} = useSelector(state => state.authReducer)
    const [mostReviewed, setMostReviewed] = useState([]);
    const [newestAdded, setNewestAdded] = useState([]);
    const [latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        api.getMostReviewedBooks().then(res => {
            setMostReviewed(res);
        });
        api.getNewestAddedBooks().then(res => {
            setNewestAdded(res);
        });
        api.getLatestReviews().then(res => {
            setLatestReviews(res);
        });
    }, []);

    return (
        <Box>
            <HomepageScreen/>
            <Grid container columns={{xs: '12', sm: '12', md: '12'}} spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box justifyContent="center" display="flex" sx={{margin: '10px'}}>
                        <List sx={{width: '100%', maxWidth: '800px', justifyContent: 'center'}}>
                            <ListItem>
                                <Typography variant="h6" sx={{textAlign:'center'}}>Most reviewed books</Typography>
                            </ListItem>
                            <Divider/>
                            {mostReviewed && mostReviewed.length > 0 && <Stepper books={mostReviewed} maxSteps={mostReviewed.length}/>}
                        </List>
                    </Box>
                    <Box justifyContent="center" display="flex">
                        <List sx={{width: '100%', maxWidth: '800px', justifyContent: 'center'}}>
                            <ListItem>
                                <Typography variant="h6" sx={{textAlign:'center'}}>Newest added books</Typography>
                            </ListItem>
                            <Divider/>
                            {newestAdded && newestAdded.length > 0 && <Stepper books={newestAdded} maxSteps={newestAdded.length}/>}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box justifyContent="center" display="flex"  sx={{margin: '10px'}}>
                        <List sx={{width: '100%', maxWidth: '800px', justifyContent: 'center'}}>
                            <ListItem>
                                <Typography variant="h6" sx={{textAlign:'center'}}>Latest reviews</Typography>
                            </ListItem>
                            <Divider/>
                            {latestReviews && latestReviews.map(review => <Review key={review.id} reviewType={REVIEW_TYPES.USER_REVIEWS} type={user ? user.type : 'guest'} reviewObj={review}/> )}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )

}
export default Home;

