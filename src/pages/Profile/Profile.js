import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Avatar, Badge, Button, Box, Grid, ListItem, Paper, Stack, TextField} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Review from "components/Review";
import {REVIEW_TYPES} from "constants/constants";
import api_auth from "api/api_auth";
import api from "api/api";
import classes from "./Profile.module.scss";


const initialState = {
    "name": {
        "value": "",
        "error": false
    },
    "surname": {
        "value": "",
        "error": false
    },
    "photo": {
        "value": "default",
        "error": false
    },
    "biography": {
        "value": "",
        "error": false
    }
}

const Profile = () => {
    const {username} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducer.user);
    const [userProfile, setUserProfile] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [editable, setEditable] = useState(false);
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const [formState, setFormState] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user && username === user.username) {
            setIsLogged(true);
            setUserProfile(user);
        }
        else {
            api_auth.getUserByUsername(username).then(res => {
                setUserProfile(res);
                setIsLogged(false);
            })
        }
    }, []);

    useEffect(() => {
        getReviews();
    }, [userProfile])

    const getReviews = () => {
        api.getReviewsUser(userProfile.username).then(res => {
            setReviews(res);
        })
    }

    const inputHandler = event => {
        const {name , value} = event.target;
        const error = name === "name" && value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    return ( <Box>
            <Box className={classes.gridContainerAuthor}>
                <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                        <Grid item xs={12} sm={12} md={12}>
                            {!editable && <Stack spacing="5px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar alt="Author" src={userProfile.photo} sx={{margin: '5px'}} sx={{width: 80, height: 80}}/>
                                <Typography variant="h6">{userProfile.username}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>{userProfile.name} {userProfile.surname}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>{userProfile.email}</Typography>
                            </Stack>}
                            {editable && <Stack spacing="10px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                       badgeContent={<IconButton color="inherit" aria-label="editAuthor" onClick={() => setEditable(true)} component="label" sx={{backgroundColor: 'white'}}>
                                           <PhotoCameraIcon />
                                       </IconButton>}>
                                    <Avatar alt="Author" src={userProfile.photo} sx={{width: 80, height: 80}}/>
                                </Badge>
                                <TextField label="Name" name="name" defaultValue={userProfile.name} onChange={inputHandler} variant="filled"/>
                                <TextField label="Surname" name="surname" defaultValue={userProfile.surname} onChange={inputHandler} variant="filled"/>
                                <TextField label="Username" name="username" defaultValue={userProfile.username} onChange={inputHandler} variant="filled"/>
                                <TextField label="Email" name="email" defaultValue={userProfile.email} onChange={inputHandler} variant="filled"/>
                            </Stack>}
                        </Grid>
                        {editable && <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <Button variant="contained" sx={{margin: '5px', borderRadius: '25px'}}>
                                Save changes
                            </Button>
                            <Button variant="outlined" sx={{margin: '5px', borderRadius: '25px'}} onClick={() => setEditable(false)}>
                                Discard
                            </Button>
                        </Grid>}
                        {!editable && (isLogged || (user && user.type === 'admin')) &&  <Grid container spacing={0} columns={{xs: 12, sm:12, md: 12 }}>
                            {isLogged && <Grid item xs={12} sm={12} md={6} sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'center', md: 'start'}}}>
                                <Stack direction={{xs: 'column', sm: 'column', md: 'row'}}>
                                    <Button variant="outlined" sx={{width: {xs: '200px', sm: '200px', md: 'auto'}, margin: '5px', borderRadius: '25px'}} onClick={() => setEditable(true)}>Change info</Button>
                                    <Button variant="contained" sx={{width: {xs: '200px', sm: '200px', md: 'auto'}, margin: '5px', borderRadius: '25px'}} onClick={() => navigate('/changePassword')}>Change password</Button>
                                </Stack>
                            </Grid>}
                            <Grid item xs={12} sm={12} md={isLogged ? 6 : 12} sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'center', md: 'end'}}}>
                                <Button variant="contained" color="error" sx={{width: {xs: '200px', sm: '200px', md: 'auto'}, margin: '5px', borderRadius: '25px'}}>Delete account</Button>
                            </Grid>
                        </Grid>}
                        {errorMessage && <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>
                        </Grid>}
                    </Grid>
                </Paper>
            </Box>
            <Grid container columns={{xs: 12, sm: 12, md: 12}} className={classes.gridContainerAuthor} sx={{paddingTop: '15px'}}>
                <Grid item xs={12} sm={12} md={12}>

                </Grid>
            </Grid>
            <Grid container className={classes.gridContainer} item xs={12} sm={12} md={12} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={12} md={12}>
                    <List sx={{width:'100%'}}>
                        <ListItem >
                            <Typography variant="h6">{userProfile.username}'s reviews</Typography>
                        </ListItem>
                        <Divider/>
                        {reviews && reviews.map(review =>
                            <Review key={review.id} reviewObj={review} type={user ? user.type: ''} getReviews={getReviews} reviewType={REVIEW_TYPES.USER_REVIEWS}/>
                        )}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Profile;