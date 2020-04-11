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

export function groupBy(array, property) {
  var hash = {};
  for (var i = 0; i < array.length; i++) {
    if (!hash[array[i][property]]) hash[array[i][property]] = [];
    hash[array[i][property]].push(array[i]);
  }
  return hash;
}

export function getUserAddress(street, city, postcode, state) {
  let addressString = street + ", " + city + ", " + postcode + ", " + state;
  return addressString;
}
