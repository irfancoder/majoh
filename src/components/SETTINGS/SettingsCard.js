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
    flexGrow:1,
  }
}));

export default function SettingsCard() {
  const classes = useStyles();
  
  return (
    <>
       
            <Typography component="h1" align="left" variant="h6" color="textPrimary" gutterBottom>
              Account Settings
            </Typography>
            <Card className={classes.root}>
                <CardContent>
                     {/*Pass in to InputText Later */}
                    <InputSettings/>
                </CardContent>
    
                <CardActions style={{justifyContent: 'flex-end'}}>
                    <Button onClick ={SubmitNewCreditCard}>Save</Button>
                </CardActions>
            </Card>
    
    </>
  );
}
