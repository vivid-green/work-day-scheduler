
// Setting variables for day start and day end for calender. Also setting duration and hoursDif for time block element creation.
// let now = moment().format("h a");
let now = moment("2 pm", "h a");
let dayStart = moment("9 am", "h a");
let dayEnd = moment("5 pm", "h a");
let addTime = dayStart.clone();
let duration = moment.duration(dayEnd.diff(addTime));
let hoursDif = parseInt(duration.asHours());
let hour = addTime.format("h a");
let currentDayElement = $("#currentDay").text(now.format("dddd, MMMM Do YYYY"));
let containerElement = $(".container");

addTimeBlocks();

function addTimeBlocks () {

    while (hoursDif > -1) {
        
        let rowElement = $("<div class='row'>");
        let colElement = $("<div class='col-md-12'>");
        let inputGrpElement = $("<div class='input-group'>");
        let prependInputGrpElement = $("<div class='input-group-prepend'>");
        let spanInputGrpTxtElement = $("<span class='input-group-text'>");
        let txtAreaFormControlElement = $("<textarea class='form-control'>");
        let appendInputGrpElement = $("<div class='input-group-append'>");
        let saveBtnElement = $("<button class='btn btn-primary btn-lg saveBtn' type='button'></button>");

        containerElement.append(rowElement);
        rowElement.append(colElement);
        colElement.append(inputGrpElement);
        inputGrpElement.append(prependInputGrpElement);
        spanInputGrpTxtElement.text(hour);
        prependInputGrpElement.append(spanInputGrpTxtElement);
        inputGrpElement.append(txtAreaFormControlElement);
        inputGrpElement.append(appendInputGrpElement);
        appendInputGrpElement.append(saveBtnElement);
        saveBtnElement.attr("id", hour.replace(/ /g,"-"));

        let past = now.isAfter(addTime, "hour");
        let present = now.isSame(addTime, "hour");
        let future = now.isBefore(addTime, "hour");

        if(past) {
            txtAreaFormControlElement.addClass("past");
        } else if (present) {
            txtAreaFormControlElement.addClass("present");
        } else {
            txtAreaFormControlElement.addClass("future");
        }

        addTime = addTime.add(1, "hour");
        hour = addTime.format("h a");
        duration = moment.duration(dayEnd.diff(addTime));
        hoursDif = parseInt(duration.asHours());
    }
}

function saveEvent() {
    console.log(this.id);
}

$(".saveBtn").click(saveEvent);


