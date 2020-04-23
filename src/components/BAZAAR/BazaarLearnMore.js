import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import dimensions from "../../styles/dimensions";
import {
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import VendorProfile from "./VendorProfile";
import { formatAMPM } from "../../utils";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(2),
  },
  price: {
    textAlign: "right",
    alignSelf: "bottom",
  },
}));

const Container = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2em;
  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding: 0.5em;
  }
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1em;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding: 0.5em;
  }
`;
const Thumbnail = styled.img`
  height: auto;
  width: 100%;
`;

const LearnMore = ({ data, context, addOrder }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState({});

  const handleClickOpen = (info) => {
    setOpen(true);
    setMenu(info);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Timing = ({ vendor, classes }) => {
    console.log(vendor);
    return (
      <Typography className={classes.description} variant="body1">
        {vendor.start ? (
          <div>
            <p>Delivery time:</p> <br />
            <b>
              {formatAMPM(vendor.start.toDate()) || " 3 PM"}-
              {formatAMPM(vendor.end.toDate()) || "5 PM"}
            </b>
          </div>
        ) : (
          "No delivery time set"
        )}
      </Typography>
    );
  };

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        size="small"
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => handleClickOpen(data)}
      >
        Learn more
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Container>
            <Thumbnail src={menu.thumbnail} alt={menu.item} />
            <Content>
              <div>
                <Typography variant="h6">{menu.item}</Typography>

                <Typography className={classes.description} variant="body1">
                  {menu.description}
                </Typography>
              </div>
              <div>
                {/* <Typography className={classes.description} variant="body1">
                  Delivery time:
                  <b>
                    {/* {menu.vendor.start.toDate() || " 3 PM"}-
                    {menu.vendor.end.toDate() || "5 PM"} 
                  </b>
                </Typography> */}

                <Timing vendor={menu.vendor} classes={classes} />
                <BottomContent>
                  <VendorProfile vendor={menu.vendor} />
                  <Typography className={classes.price} variant="h5">
                    RM {Number(menu.price).toFixed(2)}
                  </Typography>
                </BottomContent>
              </div>
            </Content>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            disableElevation
            onClick={() => addOrder(context)}
          >
            Order
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LearnMore;
