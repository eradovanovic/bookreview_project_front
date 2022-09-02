import React from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import classes from "./LoadingScreen.module.scss";

const LoadingScreen = () => {
    return (
        <Box className={classes.loadingScreen}>
            <CircularProgress color="inherit"/>
        </Box>
    )
}

export default LoadingScreen;
