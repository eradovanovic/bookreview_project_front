import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import LoadingScreen from "../components/Layout/LoadingScreen";
import {clearError, loginSuccess} from "../store/auth/authActions";
import api_auth from "../services/api/api_auth";
import {setAccessToken} from "../services/common";

const appInitializer = WrappedComponent => props => {
    const [loaded, setLoaded] = useState(true);
    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect( () => {
        const localStorageToken = localStorage.getItem("token");
        if(!user && localStorageToken){
            setAccessToken(localStorageToken)
            api_auth.getLoggedUser().then(res => {
                dispatch(loginSuccess({'user': res.user, "token": localStorageToken}))
            })
        }
    }, [dispatch]);


    useEffect(() => {
        dispatch(clearError());
    }, [location.pathname])

    return loaded ? <WrappedComponent {...props} /> : <LoadingScreen/>
}

export default appInitializer;
