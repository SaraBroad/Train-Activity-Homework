
        var config = {
            apiKey: "AIzaSyDXwQQF_CwIYzd0meEGPmeoxmr1oeRPOqE",
            authDomain: "train-scheduler-26c8e.firebaseapp.com",
            databaseURL: "https://train-scheduler-26c8e.firebaseio.com",
            projectId: "train-scheduler-26c8e",
            storageBucket: "train-scheduler-26c8e.appspot.com",
            messagingSenderId: "134693941267"
        };
        firebase.initializeApp(config);

        var database = firebase.database();

        $("form").on("submit", function (event) {
            event.preventDefault();

            var trainName = $("#train-name-input").val().trim();
            var destination = $("#destination-input").val().trim();
            var firstTrain = $("#first-train-input").val().trim();
            var firstTrainTime = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log(firstTrainTime);
            var frequencyMin = $("#frequency-input").val().trim();

            var newTrain = {
                name: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequencyMin
            };
            

            var newTrainRef = database.ref().push(newTrain);
            
            $("#train-name-input").val("");
            $("#destination-input").val("");
            $("#first-train-input").val("");
            $("#frequency-input").val("");


        });

        database.ref().on("child_added", function (snapshot) {
            var trainsObject = snapshot.val();
            var trainsObjectName = snapshot.val().name;
            var trainsObjectTime = snapshot.val().firstTrain;
            var trainsObjectFrequency = snapshot.val().frequency;

            var trainSchedule = $("tbody");
            var trainRow = $("<tr>");
          

var currentTime = moment().format("HH:mm");
var trainTime= moment(trainsObjectTime, "HH:mm");
var timeConverted = moment().diff(moment(trainTime), "HH:mm");
var remainder = timeConverted % trainsObjectFrequency;
var minutesAway = trainsObjectFrequency - remainder;
console.log(minutesAway);


var nextArrivalTime = moment().add(minutesAway, "minutes");
var nextArrival = (nextArrivalTime).format("HH:mm");


            trainRow.append("<td>" + trainsObject.name + "</td>");
            trainRow.append("<td>" + trainsObject.destination + "</td>");
            trainRow.append("<td>" + trainsObject.frequency + "</td>");
            trainRow.append("<td>" + minutesAway + "</td>");
            trainRow.append("<td>" + nextArrival + "</td>");

            trainSchedule.append(trainRow);
        });