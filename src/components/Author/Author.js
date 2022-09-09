import PropTypes from "prop-types";
import {Avatar, Link, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BookIcon from "@mui/icons-material/Book";

const Author = ({author}) => {
    return <Box sx={{width: '100%'}}>
        <Box sx={{width: "100%"}}>
            <Stack direction="row" sx={{width: '100%', display: 'flex', alignItems:'center'}}>
                <Stack direction="row" sx={{width: '90%', display: 'flex', alignItems:'center', padding: '5px', margin: '5px'}} spacing={2}>
                    <Avatar alt="Author" src={author.photo}/>
                    <Link color="#000" href={`/authors/${author.id}`} underline="hover">
                        <Typography variant="subtitle1">{author.name} {author.surname}</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', margin: '5px'}}>
                        <Typography variant="caption" sx={{display: 'flex', alignItems:'center'}}> <BookIcon/> </Typography>
                        <Typography variant="caption" sx={{display: 'flex', alignItems:'center'}}> {author.bookNum} </Typography>
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
        biography: PropTypes.string,
        photo: PropTypes.string
    })
}

export default Author;