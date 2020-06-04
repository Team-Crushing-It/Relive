//Global Variables
var ph = 0;

//Setting up the google glory
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Initialize Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyCvebiU0PFZXlYZY94xll-qOoUKUHCaSLU",
        authDomain: "test-project-ed699.firebaseapp.com",
        databaseURL: "https://test-project-ed699.firebaseio.com",
        projectId: "test-project-ed699",
        storageBucket: "test-project-ed699.appspot.com",
        messagingSenderId: "436277429197"
    });
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

//// Add a new document in collection "cities"
//db.collection("cities").doc("LA").set({
//    name: "Los Angeles",
//    state: "CA",
//    country: "USA"
//})
//    .then(function () {
//        console.log("Document successfully written!");
//    })
//    .catch(function (error) {
//        console.error("Error writing document: ", error);
//    }); 

var docRef = db.collection("sensor").doc("ph");

docRef.get().then(function (doc) {
    if (doc.exists) {
        ph = doc.data().val;
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
}); 