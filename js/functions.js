
function isFutureDate(date) {
   var today = new Date().getTime(),
      date = date.split("/");
   date = new Date(date[2], date[0] - 1, date[1]).getTime();
   return (today - date) < 0 ? true : false;
}

function showForm() {
   $('#new').css("display", "none");
   $('#form').css("display", "block");
   $("#add").on('click',function() {
      var timeValidator = validateTime();
      var dateValidator = validateDate();
	  var descriptionValidator=validateDescription();

      if (timeValidator == true && dateValidator == true && descriptionValidator == true) {
         $("#form").submit();

      }
   });
}

function validateDate() {
	   var dateInput = $('#date').val();

	   isValidDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(dateInput); 
	   $("#errorMsg").empty();
	   if (isValidDate && isFutureDate(dateInput)) {

		  $('#date').css("background-color", "green");
		  return true;

	   } else {
		  $('#date').css("background-color", "red");
		  $("#errorMsg").append("<p>Please enter a valid Date in the future!</p>");
		  return false;
	   }

}

function validateTime() {
	   var timeInput = $('#time').val();
	   var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(timeInput);

	   $("#errorMsg").empty();

	   if (isValid) {

		  $('#time').css("background-color", "green");
		  return true;

	   } else {
		  $('#time').css("background-color", "red");
		  $("#errorMsg").append("<p>Please enter a valid Time!</p>");
		  return false;
	   }
}

function validateDescription(){
	   let input = $('#description').val();
	   $("#errorMsg").empty();
	   if (input!="") {
		 $('#description').css("background-color", "green");
		  return true;

	   } else {
		  $('#description').css("background-color", "red");
		  $("#errorMsg").append("<p>Please enter a valid Description!</p>");
		  return false;
	   }
}

function hideForm() {

   $('#new').css("display", "block");
   $('#form').css("display", "none");
}
$(document).ready(function(){
	$('#form').css("display", "none");
	$('#new').on('click',showForm);
	$('#cancel').on('click',hideForm);
	$('#searchBtn').on('click',getAppointments);
    $('#date').on('change',validateDate);
    $('#time').on('change',validateTime);
	$('#description').on('change',validateDescription);
	getAppointments();
	$('#innerTable').addClass("table-striped");
});

$('.clockpicker').clockpicker({
   donetext: 'Done'
});

function getDate(date) {
   var d = new Date(date);
   var day = d.getDate();
   var month = d.getMonth() + 1;
   var year = d.getFullYear();
   var result = year + "-" + day + "-" + month;
   return result;
}

$(function() {
   $("#date").datepicker();

});

function getTime(date) {
   var d = new Date(date);
   var hours = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   var time = hours + ":" + minutes + ":" + seconds;
   return time;
}

function formatTime(date) {

   date = date.split(":");
   var hours = parseInt(date[0]);
   var minutes = parseInt(date[1]);
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   var strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
}

function formatDate(date) {
   date = date.split("-");
   var month = parseInt(date[2]);

   var day = parseInt(date[1]);
   var monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
      "July ", "August ", "September ", "October ", "November ", "December "
   ];
   var result = monthNames[month - 1].concat(day.toString());
   return result;
}

function getAppointments() {
	$("#errorMsg").empty();
   var query = $('#queryParam').val();
   $('#table').empty();
   $.get("http://localhost/pProject/perl/getAppointmentsService.cgi",
		{'param': query})
	.done(function(data) {
		var jsonData = JSON.parse(data);
         if (Object.keys(jsonData).length == 0) {

            $("#errorMsg").append("<p>No result !</p>");
         } else {
            var tr;
            tr = $("#table");
            var tbl='<table id="innerTable"> ';
			tbl+="<thead>";
            tbl+=" <tr>";
            tbl+=" <th>Date </th><th>    </th>";
            tbl+="<th> Time </th><th>    </th>";
            tbl+="<th> Description </th>  ";
            tbl+=" </tr>";
			tbl+="</thead>";
			tbl+="<tbody>";
			tbl+="</tbody>";
			tbl+="</table>";
			tr.append(tbl.toString());
            for (var i = 0; i < jsonData.length; i++) {
			   var str="";
               str+= "<tr> "+
               "<td>" + formatDate(getDate(jsonData[i].Date)) + "</td><td>     </td>"+
			   "<td>" + formatTime(getTime(jsonData[i].Date)) + "</td><td>    </td>"+
               "<td>" + jsonData[i].Description + "</td></tr>";
			   $('#innerTable > tbody:last-child').append(str.toString());
            }
			
			if(!$('#innerTable').hasClass('table-striped')){
				$('#innerTable').addClass('table-striped');
		   }
         }
		})
      .fail(function(request, status, error) {
         alert(request.responseText);
      });
}