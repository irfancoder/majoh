import Firebase from "../fire";

export function isUserLoggedIn() {
  var userAuth = Firebase.auth().currentUser;
  if (userAuth) {
    return userAuth;
  } else {
    return null;
  }
}

export function signOutUser() {
  Firebase.auth()
    .signOut()
    .then(
      function () {
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
}
