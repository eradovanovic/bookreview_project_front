import {Link} from "react-router-dom";
import ActionComponent from "../components/ActionComponent";

const Action = () => {
    return <div>
        <Link to="/">Home</Link>
        <ActionComponent/>
    </div>
}

export default Action;