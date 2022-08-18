import {Button} from "@mui/material";

import classes from "./Home.module.scss";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

const Home = () =>{
    const {currentUser, currentToken} = useSelector(state => state.authReducer);

    return <div>
        <h1>Home page!</h1>
        {currentUser &&  <Typography variant="h6">{currentUser.username}</Typography>}
        {currentToken && <Typography variant="h6">{currentToken}</Typography>}
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
    </div>
}
export default Home;