window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('.logo')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');
container.appendChild(paragraph);
const sound = document.querySelector('.sound');

paragraph.textContent = 'Relive';

var name_list = [];

icon.addEventListener('click', () => {
  sound.play();
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
//search text for keywords=======================================
    console.log("starting search")
    var word_array = [];
    var search_array = speechToText.split(" ");
    for (var i in search_array) {
      var word = search_array[i];
      //console.log (word);
      if (word.length > 3) {
       // console.log(word);
        word_array.push(word);
      }
    }
// with shortened list, search for keyword against name_list========
    for (var j in word_array) {
      //console.log("in second for")
      var search = word_array[j].toLowerCase();
      for (var k in name_list){
        //console.log("final search");
       // console.log(search);
       // console.log(name_list[k]);
        if (name_list[k] === search) {
          console.log("found "+ search);
          video(search);
          paragraph.textContent = search;
        }
      } 
    }
  }
}

//Setting up the google glory========================================

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB_Fz8rvdhq-kg-tyYTA6sZpOOeC2XGls0",
  authDomain: "my-awesome-project-271ec.firebaseapp.com",
  databaseURL: "https://my-awesome-project-271ec.firebaseio.com",
  projectId: "my-awesome-project-271ec",
  storageBucket: "my-awesome-project-271ec.appspot.com",
  messagingSenderId: "221298791292"

});

// Create a reference to storage with an initial file path and name
var storageRef = firebase.storage().ref();

// Setup database and store names into name_list
var db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});
//===========read database for all the videos and push into name_list array===================

db.collection("storage").orderBy("name")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data().name);
      var name = doc.data().name
      console.log(name);
      //console.log(doc.data().url)
      name_list.push(name);
      // tags.push(name);
    });
    // console.log(name_list)
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });
//===========push the default video==========================================================

db.collection("storage").where("name", "==", "yellow")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // console.log("in there");
      document.getElementById("vid_tag").src = doc.data().url;
      //  document.getElementById("vid_src").load();
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });




//=========function to change video ========================================================

function video(vid) {
  console.log("video change")

  db.collection("storage").where("name", "==", vid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log("in there");
        document.getElementById("vid_tag").src = doc.data().url;
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

var app = new Vue({
  el: '#app',

  data: {
    tags: []
  }
})