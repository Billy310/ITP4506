$(document).ready(function () {
    var operate = localStorage.getItem("operate");
    var ticket=localStorage.getItem("targetsite");
    if(ticket==1){
        $("#tit").html("Please Login For Reserving The Ticket");
    }
    console.log(operate)
    if (operate == "A") {
        $(location).prop('href', 'AdminPage.html')
    }
    if (operate == "O") {
        $(location).prop('href', 'o_homepage.html')
    }
    if (operate == "N") {
        $(location).prop('href', 'n_homepage.html')
    }
    else{ console.log()}

    $("#backtoindex").click(function(){
        $(location).prop('href', 'index.html')

    });

    $("#loginbtn").click(function () {

        if ($("#userid").val() == "") {
            alert("Please Fill In the User Name Column.");

        }
        else if ($("#userpwd").val() == "") {
            alert("Please Fill In the Password Column.");

        }

        else {
            $.getJSON("json/User.JSON", function (jd) {
                for (var i = 0; i < jd.user.length; i++) {
                    if ($("#userid").val() == jd.user[i].name) {
                        if ($("#userpwd").val() != jd.user[i].pwd) {
                            console.log("pwd wrong");
                        }
                        if ($("#userpwd").val() == jd.user[i].pwd) {

                            console.log(jd.user[i].name + " Login");

                            var name = jd.user[i].name;
                            var operate1 = jd.user[i].permission;






                            localStorage.setItem('name', name);
                            localStorage.setItem('operate', operate1);
                            localStorage.setItem('firstime', jd.user[i].first);
                            localStorage.setItem("message", "Welcome!")
                            var xy = localStorage.getItem("operate");

                            if(localStorage.getItem("targetsite")==1){
                                localStorage.setItem("targetsite","");
                                $(location).prop('href', 'reserveticket.html')

                            }


                           else if (jd.user[i].first == "Y") {
                                $(location).prop('href', 'FirstLoginPassword.html')
                            }
                            // if (jd.user[i].first != "Y") { $(location).prop('href', 'redirect_login.html') }
                    
                            
                    
                            else if (xy == "A") {
                                $(location).prop('href', 'AdminPage.html')
                            }
                            else if (xy == "O") {
                                $(location).prop('href', 'o_homepage.html')
                            }
                           else if (xy == "N") {
                                $(location).prop('href', 'n_homepage.html')
                            }



                            break;
                        }



                    }
                    if (i == jd.user.length - 1 && $("#userid").val() != jd.user[jd.user.length - 1].name) {
                        $(".txt_field span::before").css("background", "black");
                        alert("Login Failed. Please Try Again!");


                    }
                }

            });
        }
    });

});