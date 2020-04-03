import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import InputText from "../SETTINGS/InputText"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
    flexGrow:1,
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  
  return (
    <div>
       
            <Typography component="h1" align="left" variant="h6" color="textPrimary" gutterBottom>
              Account Settings
            </Typography>
            <Card className={classes.root}>
                <CardContent>
                     {/*Pass in to InputText Later */}
                    <InputText/>
                </CardContent>
    
                <CardActions style={{justifyContent: 'flex-end'}}>
                    <Button>Save</Button>
                </CardActions>
            </Card>
    
    </div>
  );
}
