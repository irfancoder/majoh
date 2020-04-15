import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import dimensions from "../../styles/dimensions";
import {
  Typography,
  Tooltip,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

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
    marginTop: theme.spacing(4),
  },
  price: {
    textAlign: "right",
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
const Thumbnail = styled.img`
  height: auto;
  width: 100%;
`;

const LearnMore = ({ data, addOrder }) => {
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
                <Typography variant="h5">{menu.item}</Typography>

                <Typography className={classes.description} variant="body1">
                  {menu.description}
                </Typography>
              </div>
              <div>
                <Typography className={classes.price} variant="caption">
                  Food will be fulfilled by delivery.
                </Typography>
                <Typography className={classes.price} variant="h5">
                  RM {menu.price}
                  <Tooltip title="pax = ~200g" placement="top-start">
                    <span style={{ fontSize: "14px" }}> / pax*</span>
                  </Tooltip>
                </Typography>
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
            onClick={() => addOrder(menu)}
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
