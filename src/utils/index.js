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

export function splitOrderArray(array) {
  let currentTime = new Date();
  let upcomingOrders = [];
  let pastOrders = [];

  array.forEach((item) => {
    if (stringToDate(item.orderInfo.metadata.deliveryDate) > currentTime) {
      upcomingOrders.push(item);
    } else {
      pastOrders.push(item);
    }
  });
  return {
    upcomingOrders: upcomingOrders,
    pastOrders: pastOrders,
  };
}

export function stringToDate(_date) {
  var formatLowerCase = "dd/mm/yyyy";
  const _delimiter = "/";
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}

export function getLocations() {
  const location = {
    MIRI: [
      "Piasau",
      "Krokop",
      "Pujut",
      "Padang Kerbau",
      "Bandar Miri",
      "Senadin",
      "Permyjaya",
      "Tudan",
      "Vista",
      "Lutong",
      "Lambir",
      "Taman Tunku",
      "Lopeng",
      "Morsjaya",
      "Hospital Miri",
      "Riam",
      "Airport",
      "Bumiko",
      "Tanjong",
      "Bekenu",
      "Sibuti",
    ],
    KUCHING: [
      "Batu Kawa",
      "Bandar Kuching",
      "Petrajaya",
      "Bintawa",
      "Waterfront",
      "Tabuan Jaya",
      "Padawan",
      "Kota Sentosa",
      "Kampung Stutong",
    ],
    BINTULU: [
      "Parkcity Commerce Square",
      "Kampung Baru Sebuan Besar",
      "Tanjung Kidurong",
      "Medan Mall",
      "Kampung Assyakirin",
    ],
  };
  return location;
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
