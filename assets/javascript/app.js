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
    
    //global variables
    var trainName="";
    var firstTrain=0;
    var destination="";
    var frequency=0;
    var minutesAway=0;
    var nextArrival=0;

    $(document).ready(function() {
    $("#submit-info").on("click", function(event) {
        event.preventDefault();
        trainName = $("#train-name")
        .val()
        .trim();
        destination = $("#destination")
        .val()
        .trim();
        firstTrain = $("#first-train")
        .val()
        .trim();
        frequency= $("#frequency")
        .val()
        .trim();

        console.log("hello");
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);
        // var today=moment().format("MMDDYYYY");

        // nextArrival=0;
        // console.log(nextArrival);
        // minutesAway=moment(nextArrival).diff(moment(),"minutes");
        // console.log(minutesAway);

        database.ref().push({
        name:trainName,
        destination:destination,
        starts:firstTrain,
        frequency:frequency,
        // nextArrival: nextArrival,
        // minutesAway:minutesAway
        });
        database.ref().on("child_added", function(childSnapshot){
            var newTrain=$("<tr>");
            
            newTrain.append( `<td scope="row">${childSnapshot.val().name}</td>`).append( `<td scope="row">${childSnapshot.val().destination}</td>`)
            // .append( `<td scope="row">${childSnapshot.val().frequency}</td>`)  .append( `<td scope="row">${childSnapshot.val().nextArrival}</td>`)
            // .append( `<td scope="row">${childSnapshot.val().minutesAway}</td>`);

    $("tbody").append(newTrain);
        })
    });
    });
