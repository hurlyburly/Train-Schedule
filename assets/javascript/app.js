var config = {
  apiKey: "AIzaSyCK4Kyb_zFivj066kfbIIJAcZGmW_od9P8",
  authDomain: "myfirstproject-dadc7.firebaseapp.com",
  databaseURL: "https://myfirstproject-dadc7.firebaseio.com",
  projectId: "myfirstproject-dadc7",
  storageBucket: "myfirstproject-dadc7.appspot.com",
  messagingSenderId: "492394548265"
};
// firebase.initializeApp(config);
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function() {
  $("#submit-info").on("click", function(event) {
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

    console.log("hello");
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var now = moment();
    console.log(now);
    var minutesAway =frequency-(now.diff(moment(firstTrain,"HH:mm"), "m") % frequency);
    console.log(minutesAway);

    var nextArrival =now.add(minutesAway,'m').format("HH:mm");
    console.log(nextArrival);

    database.ref().push({
      name: trainName,
      destination: destination,
      starts: firstTrain,
      frequency: frequency,
      next: nextArrival,
      minutes: minutesAway
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
});
