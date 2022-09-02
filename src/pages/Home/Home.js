import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import classes from "./Home.module.scss";

const Home = () =>{
    const {user, token} = useSelector(state => state.authReducer);

    return <div>
        <h1>Home page!</h1>
        {user &&  <Typography variant="h6">{user.username}</Typography>}
        {token && <Typography variant="h6">{token}</Typography>}
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
    </div>
}
export default Home;