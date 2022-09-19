import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


const ConfirmationDialog = ({open, closeHandler, deleteHandler}) => {
    return <Dialog open={open} onClose={closeHandler}>
        <DialogTitle id="responsive-dialog-title">
            Confirmation
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure that you want to delete this account?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={closeHandler}>
                Cancel
            </Button>
            <Button color="error" onClick={deleteHandler} autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool,
    closeHandler: PropTypes.func,
    deleteHandler: PropTypes.func
}

export default ConfirmationDialog;