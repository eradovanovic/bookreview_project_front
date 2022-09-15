import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Avatar, Badge, Button, Box, Grid, ListItem, Paper, Stack, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Review from "components/Review";
import ConfirmationDialog from "components/Layout/ConfirmationDialog";
import {REVIEW_TYPES} from "constants/constants";
import {logout, update} from "store/auth/authActions";
import {emailValid} from "utils/validators";
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
    "email": {
        "value": "",
        "error": false
    }
}

const Profile = () => {
    const {username} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, error} = useSelector((state) => state.authReducer);
    const [userProfile, setUserProfile] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [editable, setEditable] = useState(false);
    const [formState, setFormState] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

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
    }, [user, username]);

    useEffect(() => {
        if (isLogged) {
            setFormState(
                {
                    "name": {
                        "value": user.name,
                        "error": false
                    },
                    "surname": {
                        "value": user.surname,
                        "error": false
                    },
                    "photo": {
                        "value": user.photo,
                        "error": false
                    },
                    "email": {
                        "value": user.email,
                        "error": false
                    }
                }
            )
        }
    }, [isLogged, user]);

    useEffect(() => {
        if (error === '') {
            setEditable(false);
        }
        else {
            setErrorMessage("Updating user's info failed!");
        }
    }, [user.name, user.surname, user.photo, user.email, error]);

    useEffect(() => {
        getReviews();
    }, [userProfile])

    const getReviews = () => {
        api.getReviewsUser(userProfile.username).then(res => {
            setReviews(res);
        })
    }

    const deleteUserHandler = () => {
        api_auth.deleteUser(userProfile.username).then(res => {
            if (isLogged) {
                dispatch(logout());
            }
            navigate('/');
        })

    }

    const closeHandler = () => setOpenDialog(false);

    const inputHandler = event => {
        const {name , value} = event.target;
        const error = value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    const validate = (email) => {
        let error = "";
        if (!emailValid(email)) {
            error = "This is not a valid format of email.";
        }
        return error;
    }

    const changeUserDataHandler = () => {
        let errorChange = "";
        if (Object.values(formState).some(val => val.error) || Object.values(formState).some(val => !val.value)) {
            Object.values(formState).forEach(val => {
                if (!val.value && !val.error) val.error = true;
            });
            errorChange = "All fields are required!"
        }
        if (!errorChange) errorChange = validate(formState['email'].value);
        if (!errorChange) {
            dispatch(update(user.username, formState['name'].value, formState['surname'].value, formState['email'].value, formState['photo'].value));
        }
        setErrorMessage(errorChange);
    }

    return ( <Box>
            <Box className={classes.gridContainerAuthor}>
                <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                        <Grid item xs={12} sm={12} md={12}>
                            {!editable && <Stack spacing="5px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar alt="Author" src={userProfile.photo} sx={{width: 80, height: 80, margin: '5px'}}/>
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
                                <Typography variant="h6">{userProfile.username}</Typography>
                                <TextField label="Name" name="name" error={formState.name.error} helperText={formState.name.error ? 'Name is required!' : '' } defaultValue={userProfile.name} onChange={inputHandler} variant="filled"/>
                                <TextField label="Surname" name="surname" error={formState.surname.error} helperText={formState.surname.error ? 'Surname is required!' : '' } defaultValue={userProfile.surname} onChange={inputHandler} variant="filled"/>
                                <TextField label="Email" name="email" error={formState.email.error} helperText={formState.email.error ? 'Email is required!' : '' } defaultValue={userProfile.email} onChange={inputHandler} variant="filled"/>
                            </Stack>}
                        </Grid>
                        {editable && <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <Button variant="contained" sx={{margin: '5px', borderRadius: '25px'}} onClick={changeUserDataHandler}>
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
                                <Button variant="contained" color="error" sx={{width: {xs: '200px', sm: '200px', md: 'auto'}, margin: '5px', borderRadius: '25px'}} onClick={() => setOpenDialog(true)}>Delete account</Button>
                                <ConfirmationDialog open={openDialog} closeHandler={closeHandler} deleteHandler={deleteUserHandler}/>
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