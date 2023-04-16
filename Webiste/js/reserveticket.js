
var ticketitem = [];
var pricelist = [];
var totallist = [];
var qtylist = [];
var ticketarg = [];
var tpirce = 0;
var leftseat = 0;
var index = 0;

function removeconfirm(id) {

    var idx = "#xx" + id;
    $(idx).remove();

    delete totallist[id];
    console.log(pricelist);


}
$(document).ready(function () {
    var date_C = $("#fdate");
    var departurelocation_C = $("#dlocat");
    var arrivelocation_C = $("#alocat");
    var time_C = $("#ftime");
    var passenger_C = $("#fp");
    var price_C = $("#price");
    var recordnum = localStorage.getItem("rnumber");
    var ticketval = 0;

    $.getJSON("json/TicketInfo.json", function (jd) {
        for (var x = 0; x < jd.ticket.length; x++) {
            if (jd.ticket[x].flightnumber == recordnum) {
                departurelocation_C.val(jd.ticket[x].Departure);
                arrivelocation_C.val(jd.ticket[x].Arrive);
                date_C.val(jd.ticket[x].date);
                $("#ftime").val(jd.ticket[x].time);
                break;
            }
        };
    });
    function openmeal() {
        localStorage.setItem("Ticketitem", JSON.stringify(ticketitem));
        localStorage.setItem("Ticketprice", JSON.stringify(pricelist));
        localStorage.setItem("tt", JSON.stringify(totallist));
        if (ticketitem.length != 0) {
            window.open("selecticketplace.html");
        }
        else {
            $(".haha").html(`<div class="alert"><span class="closebtn"
            onclick="this.parentElement.style.display='none';">&times;</span><strong>No Ticket is Selected</strong> You
        Should Include at Least one Ticket on the record table.</div>`);

        }

    }

    $("#adddata").click(function () {
        console.log(ticketval)
 

        if ($("#quantity").val() == 0 || $("#quantity").val() < 0 || $("#quantity").val() == "") {
            $("#quantity").css("border", "2px solid red");

        }

        if ($("#flightclass").val() == "stop") {
            $("#flightclass").css("border", "2px solid red");

        }

        else if (ticketval > 0) {

            $("#quantity").css("border", "0px solid #ccc");
            $(".rwd-table").append(`<tr id="xx` + index + `"><td>`
                + departurelocation_C.val() +
                " ---> "
                + arrivelocation_C.val() +
                "</td><td>" + $("#flightclass").val() +
                "</td><td>" + $("#quantity").val() +
                "</td><td> HKD$" + $("#quantity").val() * price_C.val() +
                `</td><td><button class="noselect" id="` + index + `"  onclick="removeconfirm(this.id)"><span class='text'>Cancel</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button></td> </tr>`);
            index++;

            var qq = parseInt($("#quantity").val());
            // var ticketobj = {
            //     fclass: $("#flightclass").val(),
            //     qty : qq,
            //     eachprice: price_C.val()};
            //     ticketarg.push(ticketobj);
            //     console.log(ticketobj[0].fclass)

            qtylist.push(qq);
            console.log(qq);
            for (var x = 0; x < qq; x++) {
                totallist.push($("#flightclass").val());
                console.log(totallist);
            }
            ticketitem.push($("#flightclass").val());
            var y = $("#quantity").val();
            while (y != 0) {
                pricelist.push(price_C.val());
                y--;
            }
            console.log(pricelist);
        }
        tpirce = 0;
        for (var x = 0; x < pricelist.length; x++) {
            tpirce += parseInt(pricelist[x]);
        }
        $("#ticketq").val(pricelist.length);
        $("#tprice").val(tpirce);
    });

    $("#reset").click(function () {
        $(".rwd-table").html("<tr><th>Location</th><th>Flight Class</th><th>Quantity</th><th>Price</th></tr>");
        ticketitem = [];
        pricelist = [];
        totallist = [];
        qtylist = [];
        $("#ticketq").val(0);
        $("#tprice").val(0);
    });




    $.getJSON("json/FlightClass.JSON", function (jd) {
        for (var x = 0; x < jd.class.length; x++) {
            $("#flightclass").append("'<option>" +
                jd.class[x] +
                " </option>'");
        }
    });

    $("#flightclass").change(function () {

        $.getJSON("json/TicketInfo.json", function (jd) {
        
            for (var x = 0; x < jd.ticket.length; x++) {
                if (jd.ticket[x].flightnumber == recordnum && jd.ticket[x].class == $("#flightclass").val()) {
                    $("#price").val(jd.ticket[x].Price);
                    $("#ava").val(jd.ticket[x].available);
                    ticketval = jd.ticket[x].available;
                    if ($("#ava").val() == 0) {
                        $("#ava").css("background-color", "red");
                        $("#ava").css("color", "white");
                        $("#ava").val("Out Of Stock");
                        $("#quantity").prop("disabled","true");
                    }
                    else if ($("#ava").val() > 0 && $("#ava").val() <= 120) {
                        $("#ava").css("background-color", "lightgreen");
                        $("#ava").css("color", "black");
                        $("#quantity").removeAttr("disabled");
                    }
                    else if ($("#ava").val() > 0 && $("#ava").val() <= 120) {
                        $("#ava").css("background-color", "lightgreen")
                        $("#ava").css("color", "black")
                        $("#quantity").removeAttr("disabled");
                 
                    leftseat = jd.ticket[x].available;

                    break;

                }
                else {
                    $("#price").val(0);
                }

            }
            }
        });

    });






    // price_C.css("border", "3px solid lightgreen")

    // passenger_C.css("border", "3px solid red");
    // passport_C.css("border", "3px solid red");


    // responsemsg_passenger.html("Please Fill in the Passenger Name");
    // responsemsg_passenger.css("color", "red");
    // responsemsg_passenger.css("font-weight", "bold");



    // responsemsg_passport.html("Please Fill in the Passport Number");
    // responsemsg_passport.css("color", "red");
    // responsemsg_passport.css("font-weight", "bold");








    $("#pay").click(function () {
        checkempty();
        console.log(passenger_C.val() != "");
        console.log(time_C.val() != "");
        console.log(arrivelocation_C.val() != "");
        console.log(departurelocation_C.val() != "");
        console.log(date_C.val() != "");

        if (date_C.val() != "" &&
            time_C.val() != "" &&
            arrivelocation_C.val() != "" &&
            departurelocation_C.val() != "" &&
            date_C.val() != "" &&
            passenger_C.val() != ""
        )
            openmeal();

    });





    function checkempty() {
        if (date_C.val() == "") {
            date_C.css("border", "1px solid red");
        }
        if (date_C.val() != "") {
            date_C.css("border", "none");
        }
        if (departurelocation_C.val() == "") {
            departurelocation_C.css("border", "1px solid red");
        }
        if (departurelocation_C.val() != "") {
            departurelocation_C.css("border", "none");
        }
        if (arrivelocation_C.val() == "") {
            arrivelocation_C.css("border", "1px solid red");
        }
        if (arrivelocation_C.val() != "") {
            arrivelocation_C.css("border", "none");
        }
        if (time_C.val() == "") {
            time_C.css("border", "1px solid red");
        }
        if (time_C.val() != "") {
            time_C.css("border", "none");
        }
        if (passenger_C.val() == "") {
            passenger_C.css("border", "1px solid red");
        }
        if (passenger_C.val() != "") {
            passenger_C.css("border", "none");
        }
    }





});