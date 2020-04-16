import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";

import Firebase from "firebase";
import instance from "../../fire";

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    paddingTop: "2em",
  },
  input: {
    marginBottom: "2em",
  },
  address: {
    marginTop: "20px",
  },
}));

const allMalaysianStates = [
  "Sarawak",
  "Sabah",
  "Kedah",
  "Kelantan",
  "Penang",
  "Perlis",
  "Perak",
  "Pahang",
  "Terengganu",
  "Selangor",
  "Negeri Sembilan",
  "Melaka",
  "Johor",
  "Kuala Lumpur",
  "Putrajaya",
  "Labuan",
];

const db = Firebase.firestore(instance);

const InputSettings = ({ userData }) => {
  const [state, setState] = useState("State");
  const [user, setUser] = useState(userData);
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);

  const handleInput = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    // setTest({ ...test, [event.target.name]: event.target.value });
    console.log(user);
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = () => {
    db.collection("stripe_customers")
      .doc(user.uid)
      .set(user)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4} className={classes.container}>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.input}
              name="name"
              type="string"
              fullWidth
              label="Name"
              variant="outlined"
              onChange={handleInput}
              defaultValue={user.name}
            ></TextField>

            <TextField
              className={classes.input}
              name="email"
              type="string"
              disabled
              fullWidth
              label="Email"
              variant="outlined"
              onChange={handleInput}
              defaultValue={user.email}
            />

            <TextField
              className={classes.input}
              type="number"
              name="phone"
              fullWidth
              label="Phone number"
              placeholder="+60"
              variant="outlined"
              onChange={handleInput}
              defaultValue={user.phone}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              className={classes.input}
              multiline
              name="street"
              label="Street"
              rows="4"
              variant="outlined"
              onChange={handleInput}
              fullWidth
              defaultValue={user.street}
            />

            <TextField
              variant="outlined"
              name="city"
              className={classes.input}
              label="City"
              onChange={handleInput}
              fullWidth
              defaultValue={user.city}
            />
            <Grid container>
              <Grid item xs={6}>
                <Select
                  className={classes.input}
                  style={{ boxSizing: "border-box", marginRight: "0.5em" }}
                  variant="outlined"
                  fullWidth
                  name="state"
                  onChange={handleInput}
                  label="State"
                  placeholder="State"
                  defaultValue={user.state}
                >
                  <MenuItem value="State">State</MenuItem>
                  {allMalaysianStates.map((state, i) => {
                    return <MenuItem value={state}>{state}</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  style={{ boxSizing: "border-box", marginLeft: "0.5em" }}
                  variant="outlined"
                  onChange={handleInput}
                  name="postcode"
                  label="Postcode"
                  defaultValue={user.postcode}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button onClick={onSubmit}>Save</Button>
      </CardActions>
    </Card>
  );
};
export default InputSettings;
