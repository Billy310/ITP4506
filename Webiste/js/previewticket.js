$(document).ready(function () {



    $.getJSON("json/TicketInfo.json", function (jd) {
        var flightnum = localStorage.getItem("rnumber");
        var fromr=$("#fromr");
        var froml=$("#froml");
        var tor=$("#tor");
        var tol=$("#tol");
        var fdate=$("#fdate");
        var ftime=$("#ftime");
        var fnum=$("#fnum");
        var pm=$("#pmodel");
        
       
        console.log(flightnum);
        for (var x = 0; x < jd.ticket.length; x++) {
            if(flightnum==jd.ticket[x].flightnumber){
                fromr.val(jd.ticket[x].DepartureCountry);
                froml.val(jd.ticket[x].Departure);
                tor.val(jd.ticket[x].ArriveCountry);
                tol.val(jd.ticket[x].Arrive);
                fdate.val(jd.ticket[x].date);
                ftime.val(jd.ticket[x].time);
                fnum.val(flightnum);
                pm.val(jd.ticket[x].planemodel);

         
            // $("#ticketdata").append(`<tr><td>`+ jd.ticket[x].class +`</td><td>`+ jd.ticket[x].Price+`</td><td>`+jd.ticket[x].available+`</td></tr>`);
            var ticketseat = jd.ticket[x].available;
            console.log(ticketseat)
            if (ticketseat > 0) {
                //     $("#ticketdata").append(`<td style="background-color: red;">`+jd.ticket[x].available+`</td></tr>`);
                $("#ticketdata").append(`<tr><td>` + jd.ticket[x].class + `</td><td class="price">$ ` + jd.ticket[x].Price + `</td><td class="seat" >` + jd.ticket[x].available + `</td></tr>`);

            }
            // else if(ticketseat>0){

            //     if(ticketseat<20){

            //         $("#ticketdata").append(`<td style="background-color: yellow;">`+jd.ticket[x].available+`</td></tr>`);

            //     }

            //     else if(ticketseat<50){

            //         $("#ticketdata").append(`<td style="background-color: green;">`+jd.ticket[x].available+`</td></tr>`);

            //     }

            //     else if(ticketseat<100){

            //         $("#ticketdata").append(`<td style="background-color: lightgreen;">`+jd.ticket[x].available+`</td></tr>`);

            //     }

            // }





        }
    }
        $("#ticketdata").append(`</tbody>`);



    });


    $(".btn_continue").click(function(){
        var user=localStorage.getItem("name");
        console.log(user);
        var operate=localStorage.getItem("operate");
        console.log(operate);
    
        if(user=="null"&&operate=="null"){

            localStorage.setItem("targetsite",1);
            $(location).prop('href', 'Login.html')
       

        }
        else{

            $(location).prop('href', 'reserveticket.html')
        }


    });

});