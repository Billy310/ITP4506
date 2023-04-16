var recordnum = [];
var namelist = [];
var fligtclasses = [];
function testbutton(clicked_id) {
    localStorage.setItem("searchingname", namelist[clicked_id]);
    localStorage.setItem("searchingitem", recordnum[clicked_id]);
    localStorage.setItem("fclass", fligtclasses[clicked_id]);
    window.open('editrecord.html');
}
$(document).ready(function () {

    $(".search").append(localStorage.getItem("message"));
    $(".search").css("color", "rgb(46, 139, 87)");
    localStorage.setItem("message", "");
    $("#realdata").html("<thead><td>User</td><td>Flight Number</td><td>Flight Date</td><td>Flight Time</td><td>Arrival Airport</td><td>Departure Airport</td><td>Ticket Price</td><td>Ticket Type</td><td>Purchased</td>><td>Action</td></thead><tbody><tr></tr></tbody></table>");
    var mainname = localStorage.getItem("name");
    $("#wt").append("    " + mainname);

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

    function searching() {
        $("#realdata").html("<thead><td>User</td><td>Flight Number</td><td>Flight Date</td><td>Flight Time</td><td>Arrival Airport</td><td>Departure Airport</td><td>Ticket Price</td><td>Ticket Type</td><td>Purchased</td>><td>Action</td></thead><tbody><tr></tr></tbody></table>");
        var hasrecord = 0;
        recordnum = [];
        namelist = [];
        fligtclasses = [];
        var username = $("#user").val();

        var flightdate = $("#sdate").val();
        $.getJSON("json/ticket_ver1.json", function (jd) {
            if (flightdate != "") {
                for (var i = 0; i < jd.ticket.length; i++) {
                    if ($("#fclassoption").val()==jd.ticket[i].Type&&
                    $("#fromcountry").val()==jd.ticket[i].DepartureCountry&&
                    $("#tocountry").val()==jd.ticket[i].ArriveCountry&&
                    $("#sdate").val()==jd.ticket[i].date) {
                        namelist.push(jd.ticket[i].fullname);
                        recordnum.push(jd.ticket[i].flightnumber);
                        fligtclasses.push(jd.ticket[i].Type);
                        $("#realdata").append(
                            "'<tr><td>" +
                            jd.ticket[i].owner +
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
                            `</td><td><button value="View` + `" id="` + hasrecord + `"` + `onclick="` + "testbutton(this.id)" + `" class="editbutton">Check-In</button> </tr>`);
                        hasrecord++;
                    }
                }
                if (hasrecord == 0) {
                    alert("No Result. Please Try Again.");

                }




            }

            else if ($("#fclassoption").val() != "" &&
                $("#fromcountry").val() != "" &&
                $("#tocountry").val() != "") {
                for (var i = 0; i < jd.ticket.length; i++) {
                    if ($("#fclassoption").val()==jd.ticket[i].Type&&
                    $("#fromcountry").val()==jd.ticket[i].DepartureCountry&&
                    $("#tocountry").val()==jd.ticket[i].ArriveCountry) {
                        namelist.push(jd.ticket[i].fullname);
                        recordnum.push(jd.ticket[i].flightnumber);
                        fligtclasses.push(jd.ticket[i].Type);
                        $("#realdata").append(
                            "'<tr><td>" +
                            jd.ticket[i].owner +
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
                            `</td><td><button value="View` + `" id="` + hasrecord + `"` + `onclick="` + "testbutton(this.id)" + `" class="editbutton">Check-In</button> </tr>`);
                        hasrecord++;
                    }
                }
                if (hasrecord == 0) {
                    alert("No Result. Please Try Again.");
                }
            }
            $("#realdata").append("</tbody></table>");
            
        });
    };
});