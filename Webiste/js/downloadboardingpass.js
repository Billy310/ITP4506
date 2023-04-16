$(location).prop('href', '#openModal');
$(document).ready(function () {

    var id= localStorage.getItem("bview");
    console.log(id);


    $.getJSON("json/ticket_ver1.json", function (jd) {
        var hasrecord = 0;
        var currentdate = new Date();
        var minute=currentdate.getMinutes();
        if(currentdate.getMinutes()<10){
            minute="0"+currentdate.getMinutes();

        }
        for (var i = 0; i < jd.ticket.length; i++) {
            if(id==jd.ticket[i].id){
                $(".pname").html(`Passenger Name:`+jd.ticket[i].fullname);
                $("#ppnum").html(`Passenger Passport Number:`+jd.ticket[i].ppnum);
                $("#fnum").html(`Flight No:`+jd.ticket[i].flightnumber);
                $("#date").html(`Date:`+jd.ticket[i].date);
                $("#dest").html(`From : `+jd.ticket[i].DepartureCountry+`<br>To : `+jd.ticket[i].ArriveCountry);
                $(".from").html(`From : `+jd.ticket[i].DepartureCountry);
                $(".to").html(`To: `+jd.ticket[i].ArriveCountry);
                $(".date").html(`Date: `+jd.ticket[i].date);
                $(".btime").html(`Boarding Time: `+currentdate.getHours() + ":" + minute);
                $(".fclass").html("Class: "+jd.ticket[i].Type);
                $(".dtime").html(`Departure Time: `+jd.ticket[i].time);
                $(".seat").html(`Seat: `+jd.ticket[i].seat);
                $("#luggage").html(`Luggage Weight :`+jd.ticket[i].allowluggage+"kg");
                break;
        }
    }
    });


   

    // $(".btn-4").click(function(){
        // $(location).prop('href', 'FirstLoginPassword.html')
    // });

    







    


});