import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../store/auth/authActions";
import LoadingScreen from "../components/Layout/LoadingScreen";

const appInitializer = WrappedComponent => props => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const localStorageUser = JSON.parse(localStorage.getItem("user"));
        const localStorageToken = localStorage.getItem("token");
        if(!user && localStorageUser){
            dispatch(loginSuccess({'user': localStorageUser, "token": localStorageToken}));
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);

    return !loading ? <WrappedComponent {...props} /> : <LoadingScreen/>
}

export default appInitializer;