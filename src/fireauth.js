var firebase = require("firebase");
var firebaseui = require("firebaseui");

const config = {
  apiKey: "AIzaSyD0rkPJ6JfDKlHDaKhnzSogAJQk-0y47Mk",
  authDomain: "majoh-8eea2.firebaseapp.com",
  databaseURL: "https://majoh-8eea2.firebaseio.com",
  projectId: "majoh-8eea2",
  storageBucket: "majoh-8eea2.appspot.com",
  messagingSenderId: "692387040291",
  appId: "1:692387040291:web:8421eda8a518b95d70b596",
  measurementId: "G-9M3WZRWZNB",
};

// This is our firebaseui configuration object
const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "/terms-of-service", // This doesn't exist yet
};

// This must run before any other firebase functions
firebase.initializeApp(config);

// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function (elementId) {
  ui.start(elementId, uiConfig);
};

export default startFirebaseUI;
