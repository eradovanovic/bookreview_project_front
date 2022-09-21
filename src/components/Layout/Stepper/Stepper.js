import {useState} from "react";
import Box from "@mui/material/Box";
import {Button, MobileStepper, Stack} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import Book from "components/Book";
import {LIST_TYPES} from "constants/constants";

const Stepper = ({books, maxSteps}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 5);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1) % 5);
    };

    return (
        <Box sx={{ display:'flex', justifyContent:'center', maxWidth: '800px',  width: '100%'}}>
            <Stack direction="column" sx={{width: '100%'}}>
                {books[activeStep] && <Book type={LIST_TYPES.BOOK_LIST} book={books[activeStep]}/>}
                <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    activeStep={activeStep}
                    sx={{position: 'static'}}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
            </Stack>

        </Box>
    );
}

export default Stepper;