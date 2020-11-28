import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {CardActionArea, CardActions,CardContent,CardMedia,Button,Typography,Divider} from "@material-ui/core";
import {LocationOn,Business} from '@material-ui/icons';
import LearnMore from "./LearnMore";
import { OrderConsumer } from "../../utils/context";
const useStyles = makeStyles({
  root: {
    marginBottom: "1em",
  },
  media: {
    height: "300px",
    background:"#a4a4a4"
  },
  price: {
   textAlign: "end"
  },
  company:{
    marginTop: "1em"
  },
  buttonAction: {
    minHeight: "160px",
    
  },
});

const ChildMenu = ({ menu }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image={menu.thumbnail}
          title={menu.item}
        >
          placeholder
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="body2" component="body1">
            {menu.item}
          </Typography>
          <Typography gutterBottom className={classes.price} variant="h6" component="h2">
            RM{menu.price} /kg
          </Typography>
          <Divider/>
          <Typography className={classes.company} variant="body2" component="h2">
          <Business color="disabled" fontSize="small"/> RFM Global Sdn Bhd
          </Typography>
          <Typography  variant="body2" component="h2">
          <LocationOn color="disabled" fontSize="small"/> Miri, Sarawak
          </Typography>
          
        </CardContent>
      </CardActionArea>
      {/* <CardActions className={classes.buttonAction}>
   
        <OrderConsumer>
          {(context) => {
            return (
              <Fragment>
               
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disableElevation
                  onClick={() => context.addOrder(menu)}
                >
                  Order
                </Button>
              
                <LearnMore data={menu} addOrder={context.addOrder(menu)} />
              </Fragment>
            );
          }}
        </OrderConsumer>
      </CardActions> */}
    </Card>
  );
};

export default ChildMenu;
