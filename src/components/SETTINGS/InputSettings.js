import React, { useState, useEffect } from "react";
import UserSettings from "./UserSettings";

import { isUserLoggedIn } from "../../utils";
import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";

const InputSettings = ({ handleInput, initInput }) => {
  const UserInfo = () => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    return (
      <UserSettings
        userData={userData}
        handleInput={handleInput}
        initInput={initInput}
      />
    );
  };

  return (
<<<<<<< HEAD
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

=======
    <SuspenseWithPerf
      fallback={<p>loading user info...</p>}
      traceId={"load-burrito-status"}
    >
      <UserInfo />
    </SuspenseWithPerf>
  );
};
>>>>>>> d4088b0c6e26a07628c0defa1fa3ebe8703a577b
export default InputSettings;
