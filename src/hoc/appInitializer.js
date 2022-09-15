import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "../components/Layout/LoadingScreen";
import {loginSuccess} from "../store/auth/authActions";
import api_auth from "../api/api_auth";

const appInitializer = WrappedComponent => props => {
    const [loaded, setLoaded] = useState(false);
    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        const localStorageToken = localStorage.getItem("token");
        if(!user && localStorageUser){
            api_auth.getUserByUsername(localStorageUser).then(res => {
                dispatch(loginSuccess({'user': res, "token": localStorageToken}));
            })
        }
        setTimeout(() => {
            setLoaded(true);
        }, 1000);

    }, []);

    return loaded ? <WrappedComponent {...props} /> : <LoadingScreen/>
}

export default appInitializer;