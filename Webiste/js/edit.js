
$(document).ready(function () {
    var checkingid=localStorage.getItem("checkingrecordid")
    var searchingitem = localStorage.getItem("searchingitem");

    var seatalpha1 = ["A", "B", "C", "D", "E", "F", "G", "J", "K", "L"];
    var seatalpha2 = ["A", "D", "G", "L"];
    var seatalpha3 = ["A", "B", "D", "E", "F", "G", "K", "L"];
    var bdate;
    var recordnum;


    var open = false;
    var available = ["#name", "#ppn", "#flightalpha", "#seat"];
    var operate = localStorage.getItem("operate");
    console.log(operate);

    
    // $("title").append(searchingitem);
    $.getJSON("json/FlightClass.json", function (jd) {
        for (var x = 0; x < jd.class.length; x++) {
            $("#fclass").append(`<option>` + jd.class[x] + `</option>`);
        }

    });

    $.getJSON("json/ticket_ver1.json", function (jd) {
        for (var x = 0; x < jd.ticket.length; x++) {
            if (checkingid==jd.ticket[x].id) {
                $(".form-title").append(jd.ticket[x].id);
                $("#name").val(jd.ticket[x].fullname);
                $("#ppn").val(jd.ticket[x].ppnum);
                $("#bookdate").val(jd.ticket[x].bookdate);
                localStorage.setItem("bsdasdadate", jd.ticket[x].date);
                // bdate = jd.ticket[x].bookdate;
                $("#from").val(jd.ticket[x].Departure);
                $("#to").val(jd.ticket[x].Arrive);
                $("#fdate").val(jd.ticket[x].date);
                $("#ftime").val(jd.ticket[x].time);
                $("#fclass").val(jd.ticket[x].Type);
                localStorage.setItem("fclass", jd.ticket[x].Type);
                settheSeat();
                $("#pay").val(jd.ticket[x].Status_P);
                $("#flightalpha").val(jd.ticket[x].SeatAlpha);
                $("#seat").val(jd.ticket[x].SeatNumber);
                $("#fnum").val(jd.ticket[x].flightnumber);
                $("#price").val(jd.ticket[x].Total);
                $("#luggage").val(jd.ticket[x].allowluggage + " kg");
                recordnum = jd.ticket[x].flightnumber;
                localStorage.setItem("orderid", jd.ticket[x].order);

                console.log(recordnum);
                break;
            }
        }
    });



    bdate = localStorage.getItem("bsdasdadate");

    console.log(bdate)

    var today = new Date();
    var newdate = new Date(bdate);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var res = new Date(newdate).getTime() - new Date(today).getTime();
    var daydiff = res / (1000 * 60 * 60 * 24);

    console.log(daydiff);

    $(".lock").click(function () {
        if (daydiff < 3) {
            $(".haha").html(`<div class="alert"><span class="closebtn"
            onclick="this.parentElement.style.display='none';">&times;</span><strong>You Can Not Modify</strong> You
            Can Only Modify from the Flight date not more than 3 days.</div>`);
        }

        if (daydiff > 3) {
            $(this).toggleClass('unlocked');
            if (open == false) {
                for (var x = 0; x < available.length; x++) {
                    $(available[x]).css('border','3px solid black');
                    $(available[x]).prop('readonly', false);
                    $(available[x]).prop('disabled', false);
                    // $("#fclass").prop("disabled", false);
                }
                open = true;
            }
        

        else if (open == true){
            for (var x = 0; x < available.length; x++) {
                $(available[x]).css('border','none');
                $(available[x]).prop('readonly', true);
                $(available[x]).prop('disabled', true);
                // $("#name").prop('readonly', true);
                // $("#ppn").prop('readonly', true);
                // $("#fclass").prop('readonly', true);
                $(".haha").html(`<div class="alertyes"><span class="closebtn"
                onclick="this.parentElement.style.display='none';">&times;</span><strong>Modify Successful</strong> The Information is updated.</div>`);
            }
          
            open = false;

        }
    }
        
    });
    $("#fclass").change(function () {
        console.log($("#fclass").val());
        $.getJSON("json/TicketInfo.JSON", function (jd) {
            for (var x = 0; x < jd.ticket.length; x++) {
                console.log(jd.ticket[x].flightnumber);
                console.log(jd.ticket[x].class);
                if (jd.ticket[x].flightnumber == recordnum && jd.ticket[x].class == $("#fclass").val()) {
                    $("#price").val(jd.ticket[x].Price);
                    settheSeat();
                    console.log($("#fclass").val());
                    break;
                }
            }
        });

    });

    $("#confirm").click(function () {
       window.close();


    });





    function settheSeat() {
        var fclass = localStorage.getItem("fclass");

        if (fclass == "First Class") {
            for (var y = 0; y < seatalpha3.length; y++) {
                if (y == 0) {
                    $("#flightalpha").html(`<option value="` + seatalpha3[y] + `">` + seatalpha3[y] + `</option>`);
                }
                else {

                    $("#flightalpha").append(`<option value="` + seatalpha3[y] + `">` + seatalpha3[y] + `</option>`);

                }

            }
            for (var z = 20; z < 23; z++) {
                if (z == 20) {
                    $("#seat").html(`<option value="` + z + `">` + z + `</option>`);
                }
                else {

                    $("#seat").append(`<option value="` + z + `">` + z + `</option>`);

                }
            }
        }
        else if (fclass == "Business Class") {

            for (var y = 0; y < seatalpha1.length; y++) {
                if (y == 0) {
                    $("#flightalpha").html(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);
                }
                else {

                    $("#flightalpha").append(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);

                }
            }
            for (var z = 30; z < 43; z++) {
                if (z == 30) {
                    $("#seat").html(`<option value="` + z + `">` + z + `</option>`);
                }
                else {

                    $("#seat").append(`<option value="` + z + `">` + z + `</option>`);

                }

            }

        }
        else if (fclass == "Premium Economy Class") {

            for (var y = 0; y < seatalpha2.length; y++) {
                if (y == 0) {
                    $("#flightalpha").html(`<option value="` + seatalpha2[y] + `">` + seatalpha2[y] + `</option>`);
                }
                else {

                    $("#flightalpha").append(`<option value="` + seatalpha2[y] + `">` + seatalpha2[y] + `</option>`);

                }


            }
            for (var z = 1; z < 19; z++) {
                if (z == 1) {
                    $("#seat").html(`<option value="` + z + `">` + z + `</option>`);
                }
                else {

                    $("#seat").append(`<option value="` + z + `">` + z + `</option>`);

                }
            }
        }
        else if (fclass == "Economy Class") {
            console.log("a");
            for (var y = 0; y < seatalpha1.length; y++) {
                if (y == 0) {
                    $("#flightalpha").html(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);
                }
                else {

                    $("#flightalpha").append(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);

                }
            }
            for (var z = 45; z < 59; z++) {

                if (z == 45) {
                    $("#seat").html(`<option value="` + z + `">` + z + `</option>`);
                }
                else {

                    $("#seat").append(`<option value="` + z + `">` + z + `</option>`);

                }
            }
        }
    }








});