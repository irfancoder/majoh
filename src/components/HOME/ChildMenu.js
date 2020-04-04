import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    marginBottom: "1em"
  },
  media: {
    height: "140px"
  },
  price: {
    textAlign: "end"
  },
  buttonAction: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr"
  }
});

const ChildMenu = ({ dish }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Ayam Masak Lemak
          </Typography>
          <Typography className={classes.price} variant="body1" component="h2">
            RM 3.20 /pax
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonAction}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          disableElevation
        >
          Order
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          disableElevation
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChildMenu;
