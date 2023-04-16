$(document).ready(function () {

    var ticketlista = JSON.parse(localStorage.getItem("tt"));
    var recordnum = localStorage.getItem("rnumber");
    var flightdate = localStorage.getItem("Ticketprice");
    var xxx2;
    var seatalpha1 = ["A", "B", "C", "D", "E", "F", "G", "J", "K", "L"];
    var seatalpha2 = ["A", "D", "G", "L"];
    var seatalpha3 = ["A", "B", "D", "E", "F", "G", "K", "L"];
    // console.log(recordnum);
    console.log(ticketlista);
    // console.log(ticketlista[0]);

    $.getJSON("json/TicketInfo.JSON", function (jd) {
        for (var x = 0; x < jd.ticket.length; x++) {
            if (jd.ticket[x].flightnumber == recordnum) {
                console.log("Done");
                xxx2 = jd.ticket[x].Departure + " ---> " + jd.ticket[x].Arrive;
                console.log(xxx2);
                $("#flightlocation").val(xxx2);


                break;
            }

        };

        $("#donotneed").click(function () {
            $(location).prop('href', 'order.html');


        });


        for (var x = 0; x < ticketlista.length; x++) {
            if (ticketlista[x] == "First Class") {
                $(".rwd-table").append("<tr><td>"
                    +
                    ticketlista[x] +
                    `</td><td><select id="al` + `"class="flightalphaa"></select><select class="seata"></select></td><td><input type="text" class="pname" placeholder="Passenger Full Name"/></td><td><input type="text" placeholder="Passenger Passport Number"/></td></tr>`);
                for (var y = 0; y < seatalpha3.length; y++) {
                    if (y == 0) {
                        $(".flightalphaa").html(`<option value="` + seatalpha3[y] + `">` + seatalpha3[y] + `</option>`);
                    }
                    else {

                        $(".flightalphaa").append(`<option value="` + seatalpha3[y] + `">` + seatalpha3[y] + `</option>`);

                    }

                }
                for (var z = 20; z < 23; z++) {
                    if (z == 20) {
                        $(".seata").html(`<option value="` + z + `">` + z + `</option>`);
                    }
                    else {

                        $(".seata").append(`<option value="` + z + `">` + z + `</option>`);

                    }
                }
            }
            else if (ticketlista[x] == "Business Class") {
                $(".rwd-table").append("<tr><td>"
                    +
                    ticketlista[x] +
                    `</td><td><select class="flightalphab"></select><select class="seatb"></select></td><td><input type="text" class="pname" placeholder="Passenger Full Name"/></td><td><input type="text" class="ppnum" placeholder="Passenger Passport Number"/></td></tr>`);
                for (var y = 0; y < seatalpha1.length; y++) {
                    if (y == 0) {
                        $(".flightalphab").html(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);
                    }
                    else {

                        $(".flightalphab").append(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);

                    }
                }
                for (var z = 30; z < 43; z++) {
                    if (z == 30) {
                        $(".seatb").html(`<option value="` + z + `">` + z + `</option>`);
                    }
                    else {

                        $(".seatb").append(`<option value="` + z + `">` + z + `</option>`);

                    }

                }

            }
            else if (ticketlista[x] == "Premium Economy Class") {
                $(".rwd-table").append("<tr><td>"
                    +
                    ticketlista[x] +
                    `</td><td><select class="flightalphac"></select><select class="seatc"></select></td><td><input type="text" class="pname" placeholder="Passenger Full Name"/></td><td><input type="text"  class="ppnum" placeholder="Passenger Passport Number"/></td></tr>`);
                for (var y = 0; y < seatalpha2.length; y++) {
                    if (y == 0) {
                        $(".flightalphac").html(`<option value="` + seatalpha2[y] + `">` + seatalpha2[y] + `</option>`);
                    }
                    else {

                        $(".flightalphac").append(`<option value="` + seatalpha2[y] + `">` + seatalpha2[y] + `</option>`);

                    }


                }
                for (var z = 1; z < 19; z++) {
                    if (z == 1) {
                        $(".seatc").html(`<option value="` + z + `">` + z + `</option>`);
                    }
                    else {

                        $(".seatc").append(`<option value="` + z + `">` + z + `</option>`);

                    }
                }
            }
            else if (ticketlista[x] == "Economy Class") {
                $(".rwd-table").append("<tr><td>"
                    +
                    ticketlista[x] +
                    `</td><td><select class="flightalphad"></select><select class="seatd"></select></td><td><input type="text" class="pname" placeholder="Passenger Full Name"/></td><td><input type="text" class="ppnum" placeholder="Passenger Passport Number"/></td></tr>`);
                for (var y = 0; y < seatalpha1.length; y++) {
                    if (y == 0) {
                        $(".flightalphad").html(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);
                    }
                    else {

                        $(".flightalphad").append(`<option value="` + seatalpha1[y] + `">` + seatalpha1[y] + `</option>`);

                    }
                }
                for (var z = 45; z < 59; z++) {

                    if (z == 45) {
                        $(".seatd").html(`<option value="` + z + `">` + z + `</option>`);
                    }
                    else {

                        $(".seatd").append(`<option value="` + z + `">` + z + `</option>`);

                    }
                }
            }



        }




        $("#pay").click(function () {
            var seatnumarg = [];
            var seatnum = [];
            var realnum = [];
            var empty = false;
            $(".flightalphad").each(function (index) {
                seatnumarg.push($(this).val());
            });
            $(".seatd").each(function (index) {
                seatnum.push($(this).val());
            });

            $(".flightalphac").each(function (index) {
                seatnumarg.push($(this).val());
            });
            $(".seatc").each(function (index) {
                seatnum.push($(this).val());
            });
            $(".flightalphab").each(function (index) {
                seatnumarg.push($(this).val());
            });
            $(".seatb").each(function (index) {
                seatnum.push($(this).val());
            });
            $(".flightalphaa").each(function (index) {
                seatnumarg.push($(this).val());
            });
            $(".seata").each(function (index) {
                seatnum.push($(this).val());
            });

            $(".pname").each(function (index) {
                console.log(($(this).val().length)==0);
                if(($(this).val().length)==0){
                    empty==true;

                }
            });
            console.log("Empty:"+empty);
           

       

            console.log(seatnumarg);
            console.log(seatnum);

            for (var x = 0; x < seatnum.length; x++) {
                str = seatnumarg[x] + seatnum[x];

                realnum.push(str);
            }
            const isUnique = (arrToTest) =>
                arrToTest.length === new Set(arrToTest).size

            console.log(isUnique(realnum));
            // for (var x = 0; x < realnum.length - 1; x++) {
            //     console.log(realnum[x] == realnum[x + 1])
            //     if (realnum[x] == realnum[x + 1]) {
            //         samenum = false;
            //     }


            // }

            console.log(empty);
            if (isUnique(realnum)==true&&!empty) {
                $(location).prop('href', 'shop.html')
            }
            else if(isUnique(realnum)==false){
                alert("The Seat Number Are Duplicate!");

            }
            else if(empty==false){
                alert("The Name should not be empty");

            }
        });
    });






});