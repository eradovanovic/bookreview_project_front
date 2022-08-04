import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResult} from "../../store/simpleActions";
import "../../App.css";

const ActionComponent = (props) => {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.simpleReducer.result)

    const [newResult, setNewResult] = useState("");
    return (
        <div className="App">
            <label>
                Enter result:
                <input
                    type="text"
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                />
            </label>
            <button onClick={()=>{dispatch(setResult(newResult))}}>Save</button>
            <div>Result: {result} </div>
        </div>
    );
};

export default ActionComponent;
