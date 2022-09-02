import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../store/auth/authActions";
import LoadingScreen from "../components/Layout/LoadingScreen";

const appInitializer = WrappedComponent => props => {
    const [loaded, setLoaded] = useState(false);
    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const localStorageUser = JSON.parse(localStorage.getItem("user"));
        const localStorageToken = localStorage.getItem("token");
        if(!user && localStorageUser){
            dispatch(loginSuccess({'user': localStorageUser, "token": localStorageToken}));
        }
        setTimeout(() => {
            setLoaded(true);
        }, 1000);

    }, []);

    return loaded ? <WrappedComponent {...props} /> : <LoadingScreen/>
}

export default appInitializer;