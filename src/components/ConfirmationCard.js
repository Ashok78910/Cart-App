import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmationCard = ({
  onAddToCart,
  openCartConfirmation,
  setOpenCartConfirmation,
}) => {
  return (
    <Dialog
      open={openCartConfirmation}
      onClose={() => setOpenCartConfirmation(false)}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle sx={{ padding: "16px 24px", position: "relative" }}>
        <Typography sx={{textAlign : "center",fontSize : "20px"}}>Are you sure you want to add in cart ?</Typography>
        <IconButton
          onClick={() => setOpenCartConfirmation(false)}
          edge='end'
          aria-label='close'
          sx={{
            position: "absolute",
            right: 12,
            top: 8,
            zIndex: 1,
            fontSize: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
          className='confirmation-card-buttons'
        >
          <Button
            onClick={() => onAddToCart()}
            className='success'
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpenCartConfirmation(false)}
            className='error'
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            No
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationCard;
