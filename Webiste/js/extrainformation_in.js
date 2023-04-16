$(document).ready(function () {
    var recordid=localStorage.getItem("bview");
    console.log(recordid);
    
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (var x = 1; x <= 31; x++) {
        $("#date").append(`<option>` + x + `</option>`);
        $(".date").append(`<option>` + x + `</option>`);
    }
    for (var x = 0; x < month.length; x++) {
        $(".month").append(`<option>` + month[x] + `</option>`);

    }
    for (var x = 2016; x <= 2022; x++) {
        $("#year").append(`<option>` + x + `</option>`);

    }
    for (var x = 2022; x <= 2060; x++) {
        $(".year").append(`<option>` + x + `</option>`);

    }

    $("#correct").change(function () {
        $("#nice").show();
        if ($("#correct").attr('checked', 'checked')) {
            $(".con3").show();

        }

    });

    $("#wrong").change(function () {
        $("#nice").show();
        if ($("#wrong").attr('checked', 'checked')) {
            $(".con3").hide();

        }

    });


    $("#nice").click(function () {

        $(location).prop('href', 'boardingpass_download.html')

    });


       
    $.getJSON("json/ticket_ver1.json", function (jd) {
        for(var x=0;x<jd.ticket.length;x++){
            if(recordid==jd.ticket[x].id){

                $(".pname").append(jd.ticket[x].fullname);
                break;

            }

        }});

   
    $("#lcorrect").change(function(){

        if ($("#lcorrect").attr('checked', 'checked')) {
            $(".con5").show();
        }

    });

    $("#lwrong").change(function(){

        if ($("#lwrong").attr('checked', 'checked')) {
            $(".con5").hide();
        }

    });


    

    

 
});