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
                <Stack direction="row" sx={{width: '80%', display: 'flex', alignItems:'center', padding: '5px', margin: '5px'}} spacing={2}>
                    <Avatar alt="Author" src={author.photo}/>
                    <Link href={`/authors/${author.id}`} color="#000" underline="hover">
                        <Typography variant="subtitle1">{author.name} {author.surname}</Typography>
                    </Link>
                </Stack>
                <Stack direction="row" sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end'}}>
                        <Typography variant="subtitle1" sx={{display: 'flex', alignItems:'center'}}> <BookIcon/> 22 books</Typography>
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