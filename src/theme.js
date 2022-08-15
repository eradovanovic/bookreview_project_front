import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        subtitle1: {
            color: 'grey',
        },
        caption: {
            color: 'grey',
            fontStretch: 'extra-condensed'
        }
    }
});

export default theme;