// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
<<<<<<< HEAD
    apiKey: "AIzaSyD0rkPJ6JfDKlHDaKhnzSogAJQk-0y47Mk",
    authDomain: "majoh-8eea2.firebaseapp.com",
    databaseURL: "https://majoh-8eea2.firebaseio.com",
    projectId: "majoh-8eea2",
    storageBucket: "majoh-8eea2.appspot.com",
    messagingSenderId: "692387040291",
    appId: "1:692387040291:web:8421eda8a518b95d70b596",
    measurementId: "G-9M3WZRWZNB",
  };
  
=======
  apiKey: "AIzaSyD0rkPJ6JfDKlHDaKhnzSogAJQk-0y47Mk",
  authDomain: "majoh-8eea2.firebaseapp.com",
  databaseURL: "https://majoh-8eea2.firebaseio.com",
  projectId: "majoh-8eea2",
  storageBucket: "majoh-8eea2.appspot.com",
  messagingSenderId: "692387040291",
  appId: "1:692387040291:web:8421eda8a518b95d70b596",
  measurementId: "G-9M3WZRWZNB",
};

>>>>>>> ef4ea97d38ba9835356bbc9f61da2ae2c923e958
firebase.initializeApp(firebaseConfig);

export default firebase;
