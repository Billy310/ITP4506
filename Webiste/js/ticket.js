var fdatearg = [];
var recordnum = [];

function testbutton(clicked_id) {
  localStorage.setItem("rnumber", recordnum[clicked_id]);
  localStorage.setItem("flightdate", fdatearg[clicked_id]);
  console.log(recordnum[clicked_id]);
  var loginapprove = localStorage.getItem("name");
  if (loginapprove != "") {
    window.open('previewticket.html');
  }
  else {
    alert("Please Login First");
    window.open('login.html');
  }

}
$(document).ready(function () {

  for (var x = 0; x < 24; x++) {
    $(".selectt").append(`<option value="` + x + `">` + x + ":00" + `</option>`)
  }

  var flightdate = $("#sdate");
  var fromcountry = $("#fromcountry");
  var tocountry = $("#tocountry");
  var classtype = $("#fclassoption");
  var totime = $("#totime");
  var fromtime = $("#fromtime");

  console.log(flightdate.val());
  console.log(classtype.val());
  $(".search").append(localStorage.getItem("message"));
  $(".search").css("color", "rgb(46, 139, 87)");
  localStorage.setItem("message", "");

  $.getJSON("json/Country.JSON", function (jd) {
    for (var x = 0; x < jd.region.length; x++) {
      $("#fromcountry").append(`<option value="`+jd.region[x] +`">` +
        jd.region[x] +
        `</option>`);
      $("#tocountry").append(`<option value="`+jd.region[x] +`">` +
        jd.region[x] +
        " </option>'");
    }
  });





  $("#btnsearch").click(function () {
    searching();
  });

  function searching() {
    $("#realdata").html("");
    var hasrecord = 0;
    fdatearg = [];
    recordnum = [];
    fligtclasses = [];
    if (classtype.val() == "" || fromcountry.val() == "" || tocountry.val() == "") {
      alert("Please Fill in the searching basic information first.");

    }


    else if (classtype.val() != "" && fromcountry.val() != "" && tocountry.val() == "") {
      alert("Please Fill in the searching basic information first.");

    }
    else if (classtype.val() == "" && fromcountry.val() != "" && tocountry.val() == "") {
      alert("Please Fill in the searching basic information first.");
    }

    else if (classtype.val() == "" && fromcountry.val() == "" && tocountry.val() != "") {
      alert("Please Fill in the searching basic information first.");
    }

    else if (fromcountry.val() == tocountry.val()) {
      alert("The Countrys Should Not Be Same.");

    }


    else {
      // if (fromtime.val() >= 0 || totime.val() >= 0) {
      //   // console.log(totime.val())
      //   if (fromtime.val() > totime.val()) {
      //     alert("The Range Should be From Time Larger Than To Time")
      //     return;

      //   }
      // }

      $.getJSON("json/TicketInfo.JSON", function (jd) {
        if (fromtime.val() != -1 || totime.val() != -1) {
          
          for (var i = 0; i < jd.ticket.length; i++) {
            // console.log(fromkcountry.val() == jd.ticket[i].DepartureCountry&&tocountry.val() == jd.ticket[i].ArriveCountry&&jd.ticket[i].timenum >= fromtime.val()&&jd.ticket[i].timenum <= totime.val()&&jd.ticket[i].display==1)
            // && jd.ticket[i].timenum >= fromtime.val() &&
            // jd.ticket[i].timenum <= totime.val()&&flightdate.val() == jd.ticket[i].date
            // console.log(jd.ticket[i].timenum<$("#totime").val())
            // &&jd.ticket[i].timenum >= fromtime.val()&&jd.ticket[i].timenum <= totime.val()
            console.log(totime.val())
            console.log(fromtime.val())
            var till=totime.val();
           

            if (flightdate.val() == jd.ticket[i].date&&fromcountry.val() == jd.ticket[i].DepartureCountry&&tocountry.val() == jd.ticket[i].ArriveCountry&&flightdate.val() == jd.ticket[i].date&&jd.ticket[i].display==1&&jd.ticket[i].timenum>=fromtime.val()) {
              recordnum.push(jd.ticket[i].flightnumber);
              fdatearg.push(jd.ticket[i].date);
          

              $("#realdata").append(
                `<li class="table-row"> <div class="col col-1">` + jd.ticket[i].date + `</div>` +
                `      <div class="col col-5">` + jd.ticket[i].time + `</div>` +
                `<div class="col col-2" >` + jd.ticket[i].DepartureCountry + " &#9992;" + jd.ticket[i].ArriveCountry + `</div>` +
                `<div class="col col-3" >` + jd.ticket[i].flightnumber + `</div>` +
                `<div class="col col-4" ><button class="reserve" value="View` + `" id="` + hasrecord + `"` + `" class="newbutton"` + `onclick="` + "testbutton(this.id)" + `">More Information</button></div></li>`);
              hasrecord++;
            
          }

          }
          if (hasrecord == 0) {
            alert("No Result. Please Try Again.");

          }
        }
        // if (flightdate.val() != "") {
        //   for (var i = 0; i < jd.ticket.length; i++) {
        //     if (fromkcountry.val() == jd.ticket[i].DepartureCountry &&
        //       tocountry.val() == jd.ticket[i].ArriveCountry &&
        //       flightdate.val() == jd.ticket[i].date) {
        //       recordnum.push(jd.ticket[i].flightnumber);
        //       fdatearg.push(jd.ticket[i].date);
        //       $("#realdata").append(
        //         `<li class="table-row"> <div class="col col-1">` + jd.ticket[i].date + `</div>` +
        //         `<div class="col col-2" >` + jd.ticket[i].DepartureCountry + " &#9992; " + jd.ticket[i].ArriveCountry + `</div>` +
        //         `<div class="col col-3" >` + jd.ticket[i].flightnumber + `</div>` +
        //         `<div class="col col-4" ><button class="reserve" value="View` + `" id="` + hasrecord + `"` + `" class="newbutton"` + `onclick="` + "testbutton(this.id)" + `">More Information</button></div></li>`);
        //       hasrecord++;
        //     }

        //   }
        //   if (hasrecord == 0) {
        //     alert("No Result. Please Try Again.");

        //   }

        // }
        $("#realdata").append("</tbody></table>");
        // console.log(recordnum);
      });
    };
  }





});