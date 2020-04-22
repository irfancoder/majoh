import React, { useEffect } from "react";

import Firebase from "firebase";
import instance from "../../fire";
var firebaseui = require("firebaseui");

var ui = new firebaseui.auth.AuthUI(instance.auth());
const db = Firebase.firestore(instance);

const SignUpModal = () => {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          let customer = {
            email: authResult.user.email,
            uid: authResult.user.uid,
          };
          db.collection("stripe_customers")
            .doc(customer.uid)
            .set(customer)
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          return console.log(customer);
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          // document.getElementById("loader").style.display = "none";
        },
      },
      signInSuccessUrl: "/account",
      signInOptions: [
        instance.auth.EmailAuthProvider.PROVIDER_ID,
        instance.auth.GoogleAuthProvider.PROVIDER_ID,
      ],

      // Other config options...
    });
  });
  return <div id="firebaseui-auth-container" />;
};

export default SignUpModal;
