//Setting up the google glory

// Initialize Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyB_Fz8rvdhq-kg-tyYTA6sZpOOeC2XGls0",
        authDomain: "my-awesome-project-271ec.firebaseapp.com",
        databaseURL: "https://my-awesome-project-271ec.firebaseio.com",
        projectId: "my-awesome-project-271ec",
        storageBucket: "my-awesome-project-271ec.appspot.com",
        messagingSenderId: "221298791292"
    
    });

// Create a reference with an initial file path and name
var storageRef = firebase.storage().ref();
var vid = 'superman.mp4'


// Get the download URL and switch vids
storageRef.child(vid).getDownloadURL().then(function(url) {
    console.log("Callback Hit");
    document.getElementById("vid_tag").src = url;
    document.getElementById("vid_src").load();

}).catch(function(error) {
    console.log("Error Hit");
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
    console.log("File DNE");
      break;

    case 'storage/unauthorized':
      console.log("User doesn't have permission to access the object");
      break;

    case 'storage/canceled':
      console.log('cancelled');
      break;

    case 'storage/unknown':
      console.log("Unknown error occurred, inspect the server response");
      break;
  }
});

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');

container.appendChild(paragraph);

const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
    dictate();
  });


  const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      
      paragraph.textContent = speechToText;
    }
  }