import classes from "./Home.module.scss";
import {Button} from "@mui/material";

const Home = () =>{
    return <div>
        <h1>Home page!</h1>
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
    </div>
}
export default Home;