// Display current day 
$("#currentDay").text(dayjs().format("dddd[,] MMMM DD HH:mm"));

const currentTime = (dayjs().hour());


// Dynamically Generate time blocks
for (let hour = 9; hour <= 17; hour++) {
  $("#timeBlockContainer").append(`
    <div class="row time-block">
      <div class="col-2 hour d-flex justify-content-center align-items-center">
      ${hour % 12 === 0 ? 12 : hour % 12} ${hour >= 12 ? 'PM' : 'AM'}
      </div>
      <textarea id="dailyTask${hour}" class="col-8 description"></textarea>
      <button class="col-2 saveBtn" time-stamp="${hour}"><i class="fas fa-save"></i></button>
    </div>
  `);
}

// Saving daily tasks to local storage

$(".saveBtn").on("click", function(event){
  event.preventDefault();

  let dailyTask = $(this).prev().val();

  let timeBlock = $(this).attr("time-stamp");

  localStorage.setItem(timeBlock, dailyTask);
  
});

// Display user inputs into time blocks:
for (let hour = 9; hour <= 17; hour++) {
  $(`#dailyTask${hour}`).val(localStorage.getItem(hour.toString()));
}

$(".time-block").each(function() {
  let dataHours = $(this).children(".saveBtn").attr("time-stamp");
  if(dataHours < currentTime) {
      $(this).children("textarea").addClass("past");
  } else if(dataHours == currentTime) {
      $(this).children("textarea").addClass("present");
  } else {
      $(this).children("textarea").addClass("future");
  }
});

