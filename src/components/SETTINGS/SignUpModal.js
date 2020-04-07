import React, { useEffect } from "react";

import firebase from "../../fire";
var firebaseui = require("firebaseui");

var ui = new firebaseui.auth.AuthUI(firebase.auth());

const SignUpModal = () => {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      // callbacks: {
      //   signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      //     // console.log(redirectUrl);
      //     return console.log(authResult);
      //   },
      //   uiShown: function () {
      //     // The widget is rendered.
      //     // Hide the loader.
      //     // document.getElementById("loader").style.display = "none";
      //   },
      // },
      signInSuccessUrl: "/account",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],

      // Other config options...
    });
  });
  return <div id="firebaseui-auth-container" />;
};

export default SignUpModal;
