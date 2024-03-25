import { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

// custom style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));
const AddMemberModal = () => {
  const [open, setOpen] = useState(false);
  // MODAL OPEN
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnSubmit = () => {
    console.log("submit");
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add new member
      </Button>
      {/* modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Member
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleOnSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="User name"
                name="userName"
                size="small"
                fullWidth
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default AddMemberModal;
