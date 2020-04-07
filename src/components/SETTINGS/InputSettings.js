import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { isUserLoggedIn } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  address: {
    marginTop: "20px"
  }
  ,
  zipcode: {
    marginLeft: "20px",
    marginTop: "20px"
  }
}));

const InputSettings = () => {
  const [selectedValue, setSelectedValue] = useState("a");
  const [user, setUser] = useState(isUserLoggedIn());
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChangeText = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeButton = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // console.log(user);
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <p>Name</p>
          <TextField
            id="outlined-number"
            type="string"
            fullWidth
            variant="outlined"
            defaultValue={user.displayName}
          />
          <p>Email</p>
          <TextField
            id="outlined-number"
            type="string"
            fullWidth
            variant="outlined"
            defaultValue={user.email}
          />

          <p>Phone Number</p>
          <TextField
            id="outlined-number"
            type="number"
            fullWidth
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChangeButton}
                name="checkedB"
                color="primary"
                size="small"
              />
            }
            label="Receive an email"
          />
        </Grid>

        <Grid item xs={6}>
        <p>Address</p>
        <TextField
          id="filled-multiline-static"
          multiline
          label="Street"
          rows="3"
          variant="filled"
          fullWidth 
        />

        <TextField
          className = {classes.address}
          id="filled-multiline-static"
          variant="filled"
          label="City"
          fullWidth 
        />
  
        <TextField
          style = {{width: 155}} 
          className = {classes.address}
          id="filled-multiline-static"
          variant="filled"
          label="State"
        />


        <TextField
          style = {{width: 160}} 
          className = {classes.zipcode}
          id="filled-multiline-static"
          variant="filled"
          label="Zip"
        />

        </Grid>
        
     </Grid>
     </>
    );
}

export default InputSettings;
