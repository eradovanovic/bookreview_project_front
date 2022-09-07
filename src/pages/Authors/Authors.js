import {useEffect, useState} from "react";
import {ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import api from "api/api_authors";
import Author from "components/Author";
import classes from "./Authors.module.scss";


const Authors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        api.getAuthors().then(res => setAuthors(res));
    }, []);

    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'center',  alignContent: 'center', textAlign: 'center'}}>
        <List sx={{minWidth: '80%'}}>
            <ListItem>
                <Typography variant="h6" sx={{textAlign:'center'}}>Authors</Typography>
            </ListItem>
            <Divider/>
            {authors.map(author =>
                <Author key={author.id} author={author}/>
            )}
        </List>
    </Box>
}

export default Authors;