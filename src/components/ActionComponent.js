import React, { useState } from "react";
import { connect } from "react-redux";
import { setResult} from "../store/simpleActions";
import "../App.css";

const ActionComponent = (props) => {
    const [result, setResult] = useState("");

    const setResultAction = (event) => {
        props.setResult(result);
    }


    return (
        <div className="App">
            <label>
                Enter result:
                <input
                    type="text"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                />
            </label>
            <button onClick={setResultAction}>Save</button>
            <div>Result: {props.result} </div>

        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setResult: (result) => dispatch(setResult(result)),
});

const mapStateToProps = (state) => {
    return {
        result: state.simpleReducer.result
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionComponent);