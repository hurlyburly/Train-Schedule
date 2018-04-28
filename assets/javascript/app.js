
  var config = {
    apiKey: "AIzaSyDY4TI7NEO97Foy9cD3qQaSoG6RK3HOg9w",
    authDomain: "train-time-2c099.firebaseapp.com",
    databaseURL: "https://train-time-2c099.firebaseio.com",
    projectId: "train-time-2c099",
    storageBucket: "",
    messagingSenderId: "593056116399"
  };

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function() {
  $("#add-train-info").on("submit", function(event) {
    event.preventDefault();
    var trainName = $("#train-name")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var firstTrain = $("#first-train")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();

    var now = moment();
    var firstTrainParsed=moment(firstTrain,"HH:mm");
    var minutesAwayAfterFirst = frequency-(now.diff(firstTrainParsed, "m") % frequency);
    var minutesAwayBeforeFirst= firstTrainParsed.diff(now, "m");
    var minutesAway=0;

    if(firstTrainParsed.before()){
      minutesAway=minutesAwayBeforeFirst;
      
    } else{
      mnutesAway=minutesAwayAfterFirst;
    }
    var nextArrival = now.add(minutesAway,'m').format("HH:mm");
    database.ref().push({
      name: trainName,
      destination: destination,
      start: firstTrain,
      frequency: frequency,
      next: nextArrival,
      minutes: minutesAway
    });
  
    }); 
     database.ref().on("child_added", function(childSnapshot) {
      var newTrain = $("<tr>");

      newTrain
        .append(`<td scope="row">${childSnapshot.val().name}</td>`)
        .append(`<td scope="row">${childSnapshot.val().destination}</td>`)
        .append(`<td scope="row">${childSnapshot.val().frequency}</td>`)
        .append(`<td scope="row">${childSnapshot.val().next}</td>`)
        .append(`<td scope="row">${childSnapshot.val().minutes}</td>`);

      $("tbody").append(newTrain);
  });
});
