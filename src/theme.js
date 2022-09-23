import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h4: {
            fontFamily: ["TiemposHeadlineWeb-Bold", "Georgia", "serif"].join(','),
            fontWeight: 'bolder'

        },
        h5: {
            color: 'grey',
            fontFamily: ["TiemposHeadlineWeb-Bold", "Georgia", "serif"].join(','),
            fontWeight: "lighter",
        },
        subtitle1: {
            color: 'grey',
        },
        subtitle2: {
            fontSize: 'medium'
        },
        caption: {
            color: 'grey',
            fontStretch: 'extra-condensed'
        }
    },
    shape: {
        borderRadius: '25px'
    }
});

export default theme;