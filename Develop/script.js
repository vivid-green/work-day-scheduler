let now = moment(moment(), "h a");
// now variable below is used for testing by adjusting the "current time" to whatever you want.
// let now = moment("1 pm", "h a");
let dayStart = moment("9 am", "h a");
let dayEnd = moment("5 pm", "h a");
let addTime = dayStart.clone();
let duration = moment.duration(dayEnd.diff(addTime));
let hoursDif = parseInt(duration.asHours());
let hour = addTime.format("h a");
let localStorageId = hour.replace(/ /g,"-");
let currentDayElement = $("#currentDay").text(now.format("dddd, MMMM Do YYYY"));
let containerElement = $(".container");
let events = localStorage.getItem('events');
events = events ? JSON.parse(events) : {};
let localStorageValue = events[localStorageId];
// console.log(events);

addTimeBlocks();

function addTimeBlocks () {
    //loop to start creating and appending html elements for time blocks.
    while (hoursDif > -1) {
        //variables to store newly creating html elements.
        let rowElement = $("<div class='row'>");
        let colElement = $("<div class='col-md-12'>");
        let inputGrpElement = $("<div class='input-group'>");
        let prependInputGrpElement = $("<div class='input-group-prepend'>");
        let spanInputGrpTxtElement = $("<span class='input-group-text'>");
        let txtAreaFormControlElement = $("<textarea class='form-control'>");
        let appendInputGrpElement = $("<div class='input-group-append'>");
        let saveBtnElement = $("<button class='btn btn-primary btn-lg saveBtn' type='button'></button>");
        //Appending elements to DOM
        containerElement.append(rowElement);
        rowElement.append(colElement);
        colElement.append(inputGrpElement);
        inputGrpElement.append(prependInputGrpElement);
        spanInputGrpTxtElement.text(hour);
        prependInputGrpElement.append(spanInputGrpTxtElement);
        inputGrpElement.append(txtAreaFormControlElement);
        txtAreaFormControlElement.attr("id", "input-" + localStorageId);
        // console.log(events[localStorageId]);
        localStorageValue ? $("#input-" + localStorageId).val(localStorageValue) : $("#input-" + localStorageId).val("");
        txtAreaFormControlElement.css("color", "black");
        inputGrpElement.append(appendInputGrpElement);
        appendInputGrpElement.append(saveBtnElement);
        saveBtnElement.attr("id", localStorageId);

        let past = now.isAfter(addTime, "hour");
        let present = now.isSame(addTime, "hour");
        let future = now.isBefore(addTime, "hour");
        //if block to add respective class to textarea elements based on moment.js variables above.
        if(past) {
            txtAreaFormControlElement.addClass("past");
        } else if (present) {
            txtAreaFormControlElement.addClass("present");
        } else {
            txtAreaFormControlElement.addClass("future");
        }
        //incrementing and updating variables for time. 
        addTime = addTime.add(1, "hour");
        hour = addTime.format("h a");
        //saving events to local storage.
        localStorageId = hour.replace(/ /g,"-");
        localStorageValue = events[localStorageId];
        duration = moment.duration(dayEnd.diff(addTime));
        hoursDif = parseInt(duration.asHours());
    }
}
//Saving input from relative button element clicked.
function saveEvent() {
    let inputId = "#input-" + this.id;
    let inputValue = $(inputId).val();
    events[this.id] = inputValue;
    localStorage.setItem('events', JSON.stringify(events));
}

$(".saveBtn").click(saveEvent);


