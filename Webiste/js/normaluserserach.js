var recordnum = [];
var namelist = [];
var fligtclasses = [];
var recordid = [];
var bdate = [];
var fdate = [];
var fid = [];
var idxstr;
var idx;
var checkbox = `<div class="button" id="`
var checkboxafter = `"onclick="clickviewboardingrecord(this.id)">Check-In<span><span></span></span></div>`
function clickviewboardingrecord(id) {
    var flightdate = "";
    localStorage.setItem("bview", id);
    console.log(id);


    $.getJSON("json/ticket_ver1.json", function (jd) {
        for (var x = 0; x < jd.ticket.length; x++) {
            if (id == jd.ticket[x].id) {
                flightdate = jd.ticket[x].date;
                console.log(flightdate);
                var today = new Date();
                
                var newdate = new Date(flightdate);
                console.log(newdate)
                var daydiff = 0;
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                var res = new Date(today).getTime() - new Date(newdate).getTime();

                if (res != 0) {
                    daydiff = res / (1000 * 60 * 60 * 24);
                }

                console.log(daydiff)
                if (daydiff >-1 && daydiff < 1) {

                    localStorage.setItem("bview", id);
                    console.log(id);
                    window.open('checkin.html');
                }
                else {

                    $(".willbeadd").html(`<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><strong>Check-In Failed </strong> You Can Only Check In On the Date of Flight<div>`);

                }

                break;
            }
        }

    });




}


function testbutton(clicked_id) {

    localStorage.setItem("checkingrecordid", recordid[clicked_id])
    localStorage.setItem("searchingname", namelist[clicked_id]);
    localStorage.setItem("searchingitem", recordnum[clicked_id]);
    localStorage.setItem("fclass", fligtclasses[clicked_id]);

    window.open('editrecord.html');
}

// <div class="deldata"></div><br><hr>
// <br>
// <div class="total"></div><br><hr>
function removeconfirm(clicked_id) {
    idx = clicked_id;
    idxstr = "#xx" + clicked_id;


    var today = new Date();
    var newdate = new Date(bdate[idx]);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var res = new Date(newdate).getTime() - new Date(today).getTime();
    var daydiff = res / (1000 * 60 * 60 * 24);
    console.log(daydiff)
    if (daydiff > 3 ) {




        var itemstring = "";
        $.getJSON("json/ticket_ver1.json", function (jd) {
            var searchid = fid[idx];
            var searchfnum = recordnum[idx];


            for (var i = 0; i < jd.ticket.length; i++) {

                if (searchid == jd.ticket[i].id) {
                    itemstring = "1 x " + jd.ticket[i].Type + "    " + jd.ticket[i].Departure + `&#9992;` + jd.ticket[i].Arrive + `------------------------------------------------------------------------` + "HKD$";
                    $.getJSON("json/TicketInfo.JSON", function (xd) {
                        for (var x = 0; x < xd.ticket.length; x++) {
                            console.log(searchfnum == xd.ticket[x].flightnumber);
                            console.log(jd.ticket[i].Type == xd.ticket[x].class);
                            if (searchfnum == xd.ticket[x].flightnumber && jd.ticket[i].Type == xd.ticket[x].class) {
                                itemstring += xd.ticket[x].Price;
                                $(".deldata").html("" + itemstring);
                                break;
                            }
                        }
                    });
                    break;
                }
            }


            console.log(`<br>` + itemstring)
        });

        $(location).prop('href', '#openModal');





    }
    else {
        $(".willbeadd").html(`<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><strong>Remove Unsuccessful </strong> You Can Only Modify and Remove from the reserved date not more than 3 days.<div>`);
        $(location).prop('href', '#close');

    }


}

$(".search").append(localStorage.getItem("message"));
$(".search").css("color", "rgb(46, 139, 87)");
localStorage.setItem("message", "");

$(document).ready(function () {
    $("#realdata").html("<thead><td>ID</td><td>Flight Number</td><td>Flight Date</td><td>Flight Time</td><td>Arrival Airport</td><td>Departure Airport</td><td>Ticket Price</td><td>Ticket Type</td><td>Purchased</td>><td>Edit</td><td>CheckIn</td><td>Delete</td></thead><tbody><tr></tr></tbody></table>");
    var username = localStorage.getItem("name");
    console.log(username);

    $("#wt").append("    " + username);

    $("#btnsearch").click(function () {
        searching();
    });

    $.getJSON("json/FlightClass.JSON", function (jd) {
        for (var x = 0; x < jd.class.length; x++) {
            $("#fclassoption").append("'<option>" +
                jd.class[x] +
                " </option>'");
        }
    });
    $.getJSON("json/Country.JSON", function (jd) {
        for (var x = 0; x < jd.region.length; x++) {
            $("#fromcountry").append("'<option>" +
                jd.region[x] +
                " </option>'");
            $("#tocountry").append("'<option>" +
                jd.region[x] +
                " </option>'");
        }
    });

    $.getJSON("json/ticket_ver1.json", function (jd) {
        var hasrecord = 0;
    
        for (var i = 0; i < jd.ticket.length; i++) {
            if (username == jd.ticket[i].owner) {
                namelist.push(jd.ticket[i].fullname);
                recordnum.push(jd.ticket[i].flightnumber);
                fligtclasses.push(jd.ticket[i].Type);
                bdate.push(jd.ticket[i].date);
                fid.push(jd.ticket[i].id);
                fdate.push(jd.ticket[i].date);
                recordid.push(jd.ticket[i].id)
                $("#realdata").append(
                    `<tr id=xx` + hasrecord + `><td>` +
                    jd.ticket[i].id +
                    "</td><td>" +
                    jd.ticket[i].flightnumber +
                    "</td><td>"
                    + jd.ticket[i].date +
                    "</td><td>"
                    + jd.ticket[i].time +
                    "</td><td>" +
                    jd.ticket[i].Arrive +
                    "</td><td>" +
                    jd.ticket[i].Departure +
                    "</td><td>" +
                    "$" + jd.ticket[i].Total +
                    "</td><td>" +
                    jd.ticket[i].Type +
                    "</td><td>" +
                    jd.ticket[i].Status_P +
                    `</td><td><button class="button-32"  value="View` + `" id="` + hasrecord + `"` + `onclick="` + "testbutton(this.id)" + `">View</button>` + `<td>` + checkbox + jd.ticket[i].id + checkboxafter + `</td>` +
                    `</td><td><button class="noselect" id="` + hasrecord + `"  onclick="removeconfirm(this.id)"><span class='text'>Cancel</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button></td></tr>`);
                hasrecord++;
            }

        }
        if (hasrecord == 0) {
            console.log("No relative Data");
        }
        console.log(bdate);
        console.log(fdate);
    });



    function searching() {
        $("#realdata").html("<thead><td>ID</td><td>Flight Number</td><td>Flight Date</td><td>Flight Time</td><td>Arrival Airport</td><td>Departure Airport</td><td>Ticket Price</td><td>Ticket Type</td><td>Purchased</td>><td>Edit</td><td>CheckIn</td><td>Delete</td></thead><tbody><tr></tr></tbody></table>");
        var hasrecord = 0;
        var tableindex = 0;
        recordnum = [];
        namelist = [];
        fligtclasses = [];
        bdate = [];
        recordid=[];
        var username = localStorage.getItem("name");

        var flightdate = $("#sdate").val();
        var fromcountry = $("#fromcountry");
        var tocountry = $("#tocountry");
        var flightclass = $("#fclassoption");
        console.log(flightclass.val());
        $.getJSON("json/ticket_ver1.json", function (jd) {
            if (username != "" && flightdate != "") {
                for (var i = 0; i < jd.ticket.length; i++) {
                    date1 = new Date(flightdate);
                    date2 = new Date(jd.ticket[i].date)
                    console.log();
                    // console.log(date1.getMonth()==date2.getMonth()&&date1.getDate()==date2.getDate())
                    // console.log(date1.getDate()==date2.getDate())
                    if (flightclass.val() == jd.ticket[i].Type && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() && username == jd.ticket[i].owner && fromcountry.val() == jd.ticket[i].DepartureCountry && tocountry.val() == jd.ticket[i].ArriveCountry) {

                        $("#realdata").append(
                            `<tr id=` + hasrecord + `><td>` +
                            jd.ticket[i].id +
                            "</td><td>" +
                            jd.ticket[i].flightnumber +
                            "</td><td>"
                            + jd.ticket[i].date +
                            "</td><td>"
                            + jd.ticket[i].time +
                            "</td><td>" +
                            jd.ticket[i].Arrive +
                            "</td><td>" +
                            jd.ticket[i].Departure +
                            "</td><td>" +
                            "$" + jd.ticket[i].Total +
                            "</td><td>" +
                            jd.ticket[i].Type +
                            "</td><td>" +
                            jd.ticket[i].Status_P +
                            `</td><td><button class="button-32"  value="View` + `" id="` + hasrecord + `"` + `onclick="` + "testbutton(this.id)" + `">View</button>` + `<td>` + checkbox + jd.ticket[i].id + checkboxafter + `</td>` +
                            `</td><td><button class="noselect" id="` + hasrecord + `"  onclick="removeconfirm(this.id)"><span class='text'>Cancel</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button></td></tr>`);
                        hasrecord++;
                        namelist.push(jd.ticket[i].fullname);
                        recordnum.push(jd.ticket[i].flightnumber);
                        fligtclasses.push(jd.ticket[i].Type);
                        fid.push(jd.ticket[i].id);
                        bdate.push(jd.ticket[i].date);
                        recordid.push(jd.ticket[i].id)
                    }

                }
                if (hasrecord == 0) {
                    alert("1No Result. Please Try Again.");

                }




            }
            else {

                for (var i = 0; i < jd.ticket.length; i++) {
                    if (username == jd.ticket[i].owner && flightclass.val() == jd.ticket[i].Type && fromcountry.val() == jd.ticket[i].DepartureCountry && tocountry.val() == jd.ticket[i].ArriveCountry) {
                        console.log($("#sdate").val());
                        namelist.push(jd.ticket[i].fullname);
                        recordnum.push(jd.ticket[i].flightnumber);
                        fligtclasses.push(jd.ticket[i].Type);
                        bdate.push(jd.ticket[i].date);
                        fid.push(jd.ticket[i].id);
                        recordid.push(jd.ticket[i].id)
                        $("#realdata").append(
                            "'<tr><td>" +
                            jd.ticket[i].id +
                            "</td><td>" +
                            jd.ticket[i].flightnumber +
                            "</td><td>"
                            + jd.ticket[i].date +
                            "</td><td>"
                            + jd.ticket[i].time +
                            "</td><td>" +
                            jd.ticket[i].Arrive +
                            "</td><td>" +
                            jd.ticket[i].Departure +
                            "</td><td>" +
                            "$" + jd.ticket[i].Total +
                            "</td><td>" +
                            jd.ticket[i].Type +
                            "</td><td>" +
                            jd.ticket[i].Status_P +
                            `</td><td><button class="button-32"  value="View` + `" id="` + hasrecord + `"` + `onclick="` + "testbutton(this.id)" + `">View</button>` + `<td>` + checkbox + jd.ticket[i].id + checkboxafter + `</td>` +
                            `</td><td><button class="noselect" id="` + hasrecord + `"  onclick="removeconfirm(this.id)"><span class='text'>Cancel</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button></td></tr>`);
                        hasrecord++;
                    }

                }
                if (hasrecord == 0) {
                    alert("No Result. Please Try Again.");

                }



            }
            console.log(bdate)



            $("#realdata").append("</tbody></table>");
            // console.log(recordnum);
            // console.log(namelist);
        });
    };




    $("#removea").click(function () {



        // var today = new Date();
        // var newdate = new Date(bdate[idx]);
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        // today = mm + '/' + dd + '/' + yyyy;
        // var res = new Date(today).getTime() - new Date(newdate).getTime();
        // var daydiff = res / (1000 * 60 * 60 * 24);

        // if (daydiff < 3 && daydiff >= 0) {
        $(idxstr).remove();
        delete recordnum[idx];
        delete namelist[idx];
        delete fligtclasses[idx];
        $(".search").html(`The refund will be Processed on 3 Working Days`);
        $(location).prop('href', '#close');
        $(".willbeadd").html(`<div class="alertc"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><strong>Remove Successful </strong> The refund will be Processed on 3 Working Days.</div>`);
        // }






    });


    $("#logout").click(function () {
        var operate = localStorage.getItem("operate");
        console.log(operate)
        localStorage.setItem("operate", "");
        $(location).prop('href', 'Login.html');

    });











});