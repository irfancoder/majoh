import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SettingsCard from "../components/SETTINGS/SettingsCard";
import Button from "@material-ui/core/Button";
import SignUpModal from "../components/SETTINGS/SignUpModal";
import SignIn from "../components/SETTINGS/SignIn";
import { isUserLoggedIn, signOutUser } from "../utils/index";
import Firebase from "../fire";

const UserActionButton = withStyles({
  root: {},
})(Button);

const Account = () => {
  const [user, setUser] = useState(isUserLoggedIn());

  useEffect(() => {
    if (user === null) {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
          console.log(user);
        }
      });
    }
  }, [user]);

  console.log(user);

  const handleUserLogout = () => {
    signOutUser();
    setUser(null);
  };

  return (
    <div>
      {user !== null ? (
        <SettingsCard user={user} logout={handleUserLogout} />
      ) : (
        <SignUpModal />
      )}
    </div>
  );
};

export default Account;
