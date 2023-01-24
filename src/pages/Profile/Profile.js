import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Avatar, Badge, Button, Box, Grid, ListItem, Paper, Stack, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Review from "components/Review";
import ConfirmationDialog from "components/Layout/ConfirmationDialog";
import {DEFAULT_AVATAR_PHOTO, REVIEW_TYPES} from "constants/constants";
import {logout, update} from "store/auth/authActions";
import {emailValid} from "utils/validators";
import api_auth from "services/api/api_auth";
import api from "services/api/api";
import classes from "./Profile.module.scss";
import EmptyState from "../../components/Layout/EmptyState";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import {fetchAuthor} from "../../store/authors/authorsActions";

const initialState = {
    "name": {
        "value": "",
        "error": false,
        "required": true
    },
    "surname": {
        "value": "",
        "error": false,
        "required": true
    },
    "photo": {
        "value": DEFAULT_AVATAR_PHOTO,
        "error": false,
        "required": true
    },
    "email": {
        "value": "",
        "error": false,
        "required": true
    }
}

const Profile = () => {
    const {username} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, error} = useSelector((state) => state.authReducer);
    const [userProfile, setUserProfile] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [editable, setEditable] = useState(false);
    const [formState, setFormState] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [imgFile, setImgFile] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [title, setTitle] = useState('')


    useEffect(() => {
        if (user && username === user.username) {
            setIsLogged(true);
            setUserProfile(user);
            setImgPreview(user.photoFile);
            setLoaded(true)
        }
        else {
            api_auth.getUserByUsername(username)
                .then(res => {
                    setUserProfile(res);
                    setIsLogged(false);
                    setLoaded(true)
                })
                .catch(error => {
                    setUserProfile(null)
                    setIsLogged(false)
                    setLoaded(true)
                    setTitle(error)
                })
        }
    }, [user, username]);

    useEffect(() => {
        if (isLogged && user) {
            setFormState(
                {
                    "name": {
                        "value": user?.name,
                        "error": false,
                        "required": true
                    },
                    "surname": {
                        "value": user?.surname,
                        "error": false,
                        "required": true
                    },
                    "photo": {
                        "value": user?.photo,
                        "error": false,
                        "required": false
                    },
                    "email": {
                        "value": user?.email,
                        "error": false,
                        "required": true
                    }
                }
            )
        }
    }, [isLogged, user]);

    useEffect(() => {
        if (Object.keys(error).length === 0) {
            setEditable(false);
        }
        else {
            setErrorMessage(error.message ?? error);
        }
    }, [user?.name, user?.surname, user?.photo, user?.photoFile, user?.email, error]);

    useEffect(() => {
        getReviews();
    }, [userProfile])

    const getReviews = () => {
        if (userProfile) {
            api.getReviewsUser(userProfile.username).then(res => {
                setReviews(res);
            })
        }
    }

    const deleteUserHandler = () => {
        api_auth.deleteUser(userProfile.username).then(res => {
            if (isLogged) {
                dispatch(logout());
                setIsLogged(false)
                setUserProfile(null)
            }
            navigate('/')
        })
    }

    const closeHandler = () => setOpenDialog(false);

    const inputHandler = event => {
        const {name, files, value} = event.target;
        const error = formState[name].required && value.trim() === "";
        if (name === 'photo') {
            setImgPreview(URL.createObjectURL(files[0]));
            setImgFile(files[0]);
        }
        const val = name === 'photo' ? files[0].name : value;
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": val, "error": error, "required": prevState[name].required}
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
        if (Object.values(formState).some(val => val.error) || Object.values(formState).some(val => !val.value && val.required)) {
            Object.values(formState).forEach(val => {
                console.log(val)
                if (!val.value && !val.error) {
                    val.error = true;
                }
            });
            errorChange = "All fields are required!"
        }
        if (!errorChange) errorChange = validate(formState.email.value);
        if (!errorChange) {
            if(imgFile) {
                api_auth.getUsersPhotoUploadKey(user.username)
                    .then(key => {
                        api.uploadPhoto(imgFile, key)
                            .then(res => {
                                dispatch(update(user.username, formState.name.value, formState.surname.value, formState.email.value, res.data.url));
                            })
                    })
            }
            else {
                dispatch(update(user.username, formState.name.value, formState.surname.value, formState.email.value, formState.photo.value));
            }
        }
        setErrorMessage(errorChange);
    }

    const discardHandler = () => {
        setErrorMessage("");
        setEditable(false);
    }

    return ( loaded ? (userProfile ? <Box>
            <Box className={classes.gridContainerAuthor}>
                <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                        <Grid item xs={12} sm={12} md={12}>
                            {!editable && <Stack spacing="5px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar alt="User" src={userProfile.photoFile ? userProfile.photoFile : userProfile.photo} sx={{width: 80, height: 80}}/>
                                <Typography variant="h6">{userProfile.username}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>{userProfile.name} {userProfile.surname}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>{userProfile.email}</Typography>
                            </Stack>}
                            {editable && <Stack spacing="10px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                       badgeContent={<IconButton color="inherit" aria-label="editAuthor" onClick={() => setEditable(true)} component="label" sx={{backgroundColor: 'white'}}>
                                           <input hidden accept="image/*" type="file" name="photo" onChange={inputHandler} />
                                           <PhotoCameraIcon />
                                       </IconButton>}>
                                    <Avatar alt="Author" src={imgPreview ? imgPreview : formState.photo.value} sx={{width: 80, height: 80}}/>
                                </Badge>
                                <Typography variant="h6">{userProfile.username}</Typography>
                                <TextField label="Name" name="name" error={formState.name.error} helperText={formState.name.error ? 'Name is required!' : '' } defaultValue={userProfile.name} onChange={inputHandler} variant="outlined"/>
                                <TextField label="Surname" name="surname" error={formState.surname.error} helperText={formState.surname.error ? 'Surname is required!' : '' } defaultValue={userProfile.surname} onChange={inputHandler} variant="outlined"/>
                                <TextField label="Email" name="email" error={formState.email.error} helperText={formState.email.error ? 'Email is required!' : '' } defaultValue={userProfile.email} onChange={inputHandler} variant="outlined"/>
                            </Stack>}
                        </Grid>
                        {editable && <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <Button variant="contained" sx={{margin: '5px', borderRadius: '25px'}} onClick={changeUserDataHandler}>
                                Save changes
                            </Button>
                            <Button variant="outlined" sx={{margin: '5px', borderRadius: '25px'}} onClick={discardHandler}>
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
        </Box> : <EmptyState title={title} subtitle=""/>) :
            <LoadingScreen/>
    );
}

export default Profile;
