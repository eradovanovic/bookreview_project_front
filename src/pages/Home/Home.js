import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import classes from "./Home.module.scss";

const Home = () =>{
    const {loggedUser, loggedToken, registeredUser, registeredToken} = useSelector(state => state.authReducer);

    return <div>
        <h1>Home page!</h1>
        {loggedUser &&  <Typography variant="h6">{loggedUser.username}</Typography>}
        {loggedToken && <Typography variant="h6">{loggedToken}</Typography>}
        {registeredUser &&  <Typography variant="h6">{registeredUser.username}</Typography>}
        {registeredToken && <Typography variant="h6">{registeredToken}</Typography>}
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
    </div>
}
export default Home;