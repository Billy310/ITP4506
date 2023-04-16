$(document).ready(function () {
    $(location).prop('href', '#openModal');
    var cm1 = false;
    var cm2 = false;
    var cm3 = false;
    var cm4 = false;
    var mealname = JSON.parse(localStorage.getItem("itemarray"));
    var price = JSON.parse(localStorage.getItem("pricearray"));
    var ticketlista = JSON.parse(localStorage.getItem("tt"));
    var recordnum = localStorage.getItem("rnumber");
    var pricelist = JSON.parse(localStorage.getItem("Ticketprice"));
    
    var priceforeach = 0;
    var totalprice = 0;
    console.log(recordnum);
    console.log(mealname);
    console.log(ticketlista);
    Object.defineProperties(Array.prototype, {
        count: {
            value: function (value) {
                return this.filter(x => x == value).length;
            }
        }
    });

    $("#checkoutlist").click(function () {

        $(location).prop('href', '#openModal');

    });
    $("#realdata").html("<thead><td> </td><td>Item Name</td>Quantity<td><td>Price</td></thead><tbody><tr></tr></tbody></table>");

    // for (var i = 0; i < mealname.length; i++) {

    //     $(".realdata").append(

    //         "<tr><td> </td><td>" +

    //         mealname[i] +
    //         "</td><td>" +
    //         "HKD$ " + price[i] + "</td></tr>");
    // };
    
    var meallist = ["SET-A", "SET-B", "SET-C" ]
    var mealprice=[35,45,90]
    var meal="";
    var mealpriceeach=0;
    $(".realdata").append(`<tr id="mealline"><td></td><td  class="topical">Meal Set</td><td> </td><td> </td><td> </td></tr>`);

    for (var x = 0; x < meallist.length; x++) {
        meal=meallist[x];
        mealpriceeach=mealprice[x];
            for (var y = 0; y < mealname.length; y++) {
                if(mealname.count(meal)>0){
                $(".realdata").append(`<tr><td> </td><td class="topical">`+meal +"</td><td>"+mealname.count(meal) +"</td><td>"+ mealpriceeach+`</td><td class="price">`+ + mealpriceeach*mealname.count(meal) + "</td></tr>");
                break;
            }
        }
    }



    // ticketlista.count("Economy Class")
    var fclasstype = ["Economy Class", "Premium Economy Class", "Business Class", "First Class"]
    var fclasssel="";
    $.getJSON("json/TicketInfo.JSON", function (jd) {
        $(".realdata").append(`<tr id="ftline"><td></td><td  class="topical">Flight Ticket</td><td> </td><td> </td><td> </td></tr>`);
        var rnum=localStorage.getItem("rnumber");
        console.log(rnum)
    for (var x = 0; x < fclasstype.length; x++) {
        fclasssel=fclasstype[x];
            for (var y = 0; y < jd.ticket.length; y++) {
                console.log(y)
                if(rnum==jd.ticket[y].flightnumber&&fclasssel==jd.ticket[y].class&&ticketlista.count(fclasssel)>0){
                $(".realdata").append(`<tr><td> </td><td class="topical">`+fclasssel +"</td><td>"+ticketlista.count(fclasssel) +"</td><td>"+jd.ticket[y].Price +`</td><td class="price">`+ jd.ticket[y].Price*ticketlista.count(fclasssel) + "</td></tr>");
                break;
            }
        }
    }
    for (var i = 0; i < pricelist.length; i++) {
        totalprice += parseInt(pricelist[i]);
    }
    for (var i = 0; i < price.length; i++) {
        totalprice += parseInt(price[i]);

    }
 
    $(".realdata").append(`<tr><td> </td><td  class="topical">Ticket Tax</td><td>`+ticketlista.length +`</td><td>120</td><td class="price">` + 120*ticketlista.length + "</td></tr>");
    totalprice+=120*ticketlista.length;
    $(".realdata").append("<tr id=total><td> </td>" + `<td class="topical"> Total </td><td> </td><td></td><td class="price">` + totalprice + "</td></tr>");
});

    



    $("#c1").keyup(function () {
        checkcm();
    });
    $("#c2").keyup(function () {
        checkcm();
    });
    $("#c3").keyup(function () {
        checkcm();
    });
    $("#c4").keyup(function () {
        checkcm();
    });
    $("#pay").click(function () {
        checkcm();
        if (cm1 && cm2 && cm3 && cm4) {
            $(location).prop('href', 'redirectb.html')
            localStorage.setItem("itemarray", null);
            localStorage.setItem("pricearray", null);
            localStorage.setItem("tt", null);
            localStorage.setItem("rnumber", null);
            localStorage.setItem("Ticketprice", null);
        }
    });

    function checkcm() {
        if ($("#c1").val().length > 10) {
            cm1 = true;
        }
        if ($("#c1").val().length < 10) {
            cm1 = false;
        }
        if ($("#c2").val().length >= 16) {
            cm2 = true;
        }
        if ($("#c2").val().length < 16) {
            cm2 = false;
        }
        if ($("#c3").val().length == 5) {
            cm3 = true;
        }
        if ($("#c3").val().length < 5) {
            cm3 = false;
        }
        if ($("#c3").val().length > 5) {
            cm3 = false;
        }
        if ($("#c4").val().length == 3) {
            cm4 = true;
        }
        if ($("#c4").val().length < 3) {
            cm4 = false;
        }
        if ($("#c4").val().length > 3) {
            cm4 = false;
        }
        if (!cm1) {
            $("#c1").css("border", "1px solid red");


        }
        if (!cm2) {
            $("#c2").css("border", "1px solid red");
        }
        if (!cm3) {
            $("#c3").css("border", "1px solid red");
        }
        if (!cm4) {
            $("#c4").css("border", "1px solid red");
        }
        if (cm1) {
            $("#c1").css("border", "none");
        }
        if (cm2) {
            $("#c2").css("border", "none");
        }
        if (cm3) {
            $("#c3").css("border", "none");
        }
        if (cm4) {
            $("#c4").css("border", "none");
        }

    }






});