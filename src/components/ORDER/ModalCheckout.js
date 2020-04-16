import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalCheckout({total, orders}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [confirmButton, setconfirmButton] = React.useState(false)
    const redirect = () => {
        fetch(
        "https://us-central1-majoh-8eea2.cloudfunctions.net/payCashOnDelivery",
            {
                method: "POST",
                body: JSON.stringify(orders)
            }
        ).then((response) =>{
        window.location = '/paidorders';
        return response.json()
        })
    };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      console.log("IM here and open" + open);
    setOpen(false);
  };

  return (
    <div>
    <Button 
    variant="contained"
    style={{ width: "100%", marginTop: "1em" }}
   onClick={handleOpen}>
       Cash on delivery
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Confirm payment</h2>
            <p id="transition-modal-description">Are you sure you want to pay by cash?</p>
            <div>
                
            <Button
            onClick={redirect}
            >
            Confirm {total ? "(RM" + total + ")" : ""}
            </Button>
        

            <Button
            onClick={handleClose}>
                Cancel
            </Button>
            </div>
          </div>
            
        </Fade>
      </Modal>
    </div>
  );
}
