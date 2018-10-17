var config = {
    apiKey: "AIzaSyDCIvmAtCOUx7-AFZLlIpGZfUpYjkPOp1E",
    authDomain: "clickbuttoncounter-52dda.firebaseapp.com",
    databaseURL: "https://clickbuttoncounter-52dda.firebaseio.com",
    projectId: "clickbuttoncounter-52dda",
    storageBucket: "clickbuttoncounter-52dda.appspot.com",
    messagingSenderId: "582193270376"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Button for adding new train
  $("#checkPrice").on("click", function(event) {
    event.preventDefault();
  
    // user input
    var magicName = $("#magic-name-input").val().trim();
    var magicDest = $("#dest-input").val().trim();
    var magicDate = moment($("#date-input").val().trim(), "hh:mm").format("minute");
    var magicRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding magic train info
    var newMagicTrain = {
      name: magicName,
      dest: magicDest,
      date: magicDate,
      rate: magicRate
    };
  
    // Uploads new magic train info
    database.ref().push(newMagicTrain);
  
    // Logs everything to console
    console.log(magicName.name);
    console.log(magicDest.dest);
    console.log(magicDate.date);
    console.log(magicRate.rate);
  
    // alert("Magic Train info successfully added");
  
    // Clears all of the text-boxes
    $("#magic-name-input").val("");
    $("#dest-input").val("");
    $("#date-input").val("");
    $("#rate-input").val("");
  });
  
  // Create Firebase event for adding magic train info to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var magicName = childSnapshot.val().name;
    var magicDest = childSnapshot.val().dest;
    var magicDate = childSnapshot.val().date;
    var magicRate = childSnapshot.val().rate;
  
    // Magic Train Info
    console.log(magicName);
    console.log(magicDest);
    console.log(magicDate);
    console.log(magicRate);
  
    var magicDatePretty = moment.unix(magicDate).format("MM/DD/YYYY   hh:mm");
    console.log(magicDatePretty);
  
    // Calculate the travel duration
    var magicDuration = moment().diff(moment(magicDate, "m"), "minute");
    console.log(magicDuration);
    // var magicDuration = moment();
    // console.log("This is the durationtime: " + moment(magicDuration).format("minutes"));
  
    // Calculate the total rate
    var magicTotal = magicDuration * magicRate;
    console.log(magicTotal);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(magicName),
      $("<td>").text(magicDest),
      $("<td>").text(magicDatePretty),
      $("<td>").text(magicDuration + 'min'),
      $("<td>").text('$' + magicRate),
      $("<td>").text('$' + magicTotal)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  convertMilitaryToMinutes = function(time){
      var minutes = (time.hour()*60) + time.minute();
      return minutes
    };
  