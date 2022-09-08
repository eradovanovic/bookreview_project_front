import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import classes from "./EmptyState.module.scss";
import {Stack} from "@mui/material";


const EmptyState = () => {
    return <Box className={classes.box}>
        <Stack direction="column" className={classes.box}>
            <img className={classes.notFoundIMG} src={'https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small_2x/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'}/>
            <Typography variant="h6">No books found!</Typography>
            <Typography variant="subtitle1"> Try changing the filters or search term!</Typography>
        </Stack>
    </Box>
}

export default EmptyState;