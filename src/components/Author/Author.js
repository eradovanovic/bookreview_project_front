import PropTypes from "prop-types";
import {Avatar, Link, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BookIcon from "@mui/icons-material/Book";

const Author = ({author}) => {
    const {id, name, surname, photo, photoFile, bookNum} = author;
    return <Box sx={{width: '100%'}}>
        <Box sx={{width: "100%"}}>
            <Stack direction="row" sx={{width: '100%', display: 'flex', alignItems:'center'}}>
                <Stack direction="row" sx={{width: '90%', display: 'flex', alignItems:'center', padding: '5px', margin: '5px'}} spacing={2}>
                    <Avatar alt="Author" src={photoFile ? photoFile : photo}/>
                    <Link color="#000" href={`/authors/${id}`} underline="hover">
                        <Typography variant="subtitle1">{name} {surname}</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', margin: '5px'}}>
                        <Typography variant="caption" sx={{display: 'flex', alignItems:'center'}}> <BookIcon/> </Typography>
                        <Typography variant="caption" sx={{display: 'flex', alignItems:'center'}}> {bookNum} </Typography>
                </Stack>
            </Stack>
        </Box>
        <Divider/>
    </Box>
}

Author.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        surname: PropTypes.string,
        bookNum: PropTypes.number,
        photo: PropTypes.string,
        photoFile: PropTypes.string
    })
}

export default Author;
