import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import InputSettings from "./InputSettings"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SubmitNewCreditCard from '../StripeInterface';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
    flexGrow: 1,
  },
}));

const SettingsCard = ({ user, logout }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography
        component="h1"
        align="left"
        variant="h6"
        color="textPrimary"
        gutterBottom
      >
        Account Settings
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          {/*Pass in to InputText Later */}
          <InputSettings user={user} />
        </CardContent>

        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button>Save</Button>
        </CardActions>
      </Card>
      <Button onClick={logout}>sign out</Button>
    </div>
  );
};

export default SettingsCard;
