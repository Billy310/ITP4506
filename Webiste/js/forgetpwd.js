
    $(document).ready(function () {
        function checkStrength(password) {
  
  var strength = 0
  var longerp = false;
  var numberp = false;
  var specialp = false;
  var capitalp = false;
  
  if (password.length < 6) {
      $('#strengthMessage').removeClass()
      $('#strengthMessage').addClass('Short')
      $("#password").html(
          "&#10060;  At least 7 digits<br>&#10060; At least one Capital Letter<br> &#10060; At least one Special Letter<br>&#10060; At least one Numeric Letter");
      return 'Too short'
  }
  if (password.length >= 7) {
      longerp = true;
      strength += 1;
  }
  if (password.match(/([0-9])/)) {
      numberp = true;
  }
  if (password.match(/([a-zA-Z])/)) {
      capitalp = true;
  }
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      specialp = true;
  }
  // If password contains both lower and uppercase characters, increase strength value.  
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
  
  }
  // If it has numbers and characters, increase strength value.  
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
  
      strength += 1;
  }
  // If it has one special character, increase strength value.  
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      specialp = true;
      strength += 1;
  }
  // tick&#9989; cross&#10060;
  if (longerp) {
      $("#password").html(
          "&#9989;   At least 7 digits<br>&#10060; At least one Capital Letter<br> &#10060; At least one Special Letter<br>&#10060; At least one Numeric Letter");
  }
  if (specialp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#10060; At least one Capital Letter<br> &#9989;  At least one Special Letter<br>&#10060; At least one Numeric Letter");
  }
  if (numberp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#10060; At least one Capital Letter<br> &#10060;  At least one Special Letter<br>&#9989; At least one Numeric Letter");
  }
  if (capitalp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#9989; At least one Capital Letter<br> &#10060;  At least one Special Letter<br>&#10060; At least one Numeric Letter");
  }
  if (specialp && capitalp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#9989; At least one Capital Letter<br>&#9989; At least one Special Letter<br>&#10060;At least one Numeric Letter");
  }
  if (specialp && numberp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#10060; At least one Capital Letter<br>&#9989; At least one Special Letter<br>&#9989; At least one Numeric Letter");
  }
  if (longerp && numberp && capitalp) {
      $("#password").html(
          "&#9989;  At least 7 digits<br>&#9989; At least one Capital Letter<br> &#10060; At least one Special Letter<br>&#9989; At least one Numeric Letter");
  }
  
  if (longerp && numberp && capitalp && specialp) {
      $("#password").html(
          "&#9989;   At least 7 digits<br>&#9989; At least one Capital Letter<br> &#9989; At least one Special Letter<br>&#9989; At least one Numeric Letter");
  }
  // If it has two special characters, increase strength value.  
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
  
      strength += 1;
  }
  // Calculated strength value, we can return messages  
  // If value is less than 2  
  if (strength < 2) {
      $('#strengthMessage').removeClass()
      $('#strengthMessage').addClass('Weak')
      return 'Weak'
  
  } else if (strength == 2) {
      $('#strengthMessage').removeClass()
      $('#strengthMessage').addClass('Good')
      return 'Good'
  
  } else {
      $('#strengthMessage').removeClass()
      $('#strengthMessage').addClass('Strong')
      return 'Strong'
  
  }
  }
        var emailexist = false;
        var passwordproblem = false;
        var isempty=false;
        var isStrong=false;
        
        $("#email").keyup(function () {
          $.getJSON("json/User.json", function (jd) {
            
            for (var i = 0; i < jd.user.length; i++) {
              console.log(jd.user[i].email);
              if ($("#email").val().toLowerCase() == jd.user[i].email.toLowerCase()) {
                
                emailexist=true;
                break;
              }
            }
          });
        });
  
        $("#getcode").click(function(){
          if(emailexist==true){
            $(".responseusermsg").html("The Security Code sent");
            $(".responseusermsg").css("color","green");
          }
          else{
            $(".responseusermsg").html("The Email Do Not Exist");
            $(".responseusermsg").css("color","red");
  
          }
        });
  
        $("#pwd1").keyup(function () {//Password Strength
          if ($("#pwd1").val() != $("#pwd2").val()) {
  
            $("#pwd1").css("border", "2px solid red");
            $("#pwd2").css("border", "2px solid red");
            console.log("not same");
            passwordproblem = false;
          }
          if ($("#pwd1").val() == $("#pwd2").val()) {
            passwordproblem = true;
            $("#pwd1").css("border", "1px solid #ccc");
            $("#pwd2").css("border", "1px solid #ccc");
          }
          console.log(checkStrength($('#pwd1').val()));
     
  
        });
        $("#pwd2").keyup(function () {//Password Strength
          if ($("#pwd1").val() != $("#pwd2").val()) {
  
            $("#pwd1").css("border", "2px solid red");
            $("#pwd2").css("border", "2px solid red");
            console.log("not same");
            passwordproblem = false;
          }
          if ($("#pwd1").val() == $("#pwd2").val()) {
            passwordproblem = true;
            $("#pwd1").css("border", "1px solid #ccc");
            $("#pwd2").css("border", "1px solid #ccc");
          }
          console.log(checkStrength($('#pwd1').val()));
          $("#pwd2").css("border", "1px solid #ccc");
        });
  
        $("#sec").keyup(function(){
          $("#sec").css("border", "1px solid #ccc");
        });
  
        $("#email").keyup(function(){
          $("#email").css("border", "1px solid #ccc");
        });
   
  
        $("#btnsub").click(function(){
          if ($("#email").val().length == 0) {
            isempty = false;
            console.log("0 word");
            $("#email").css("border", "2px solid red");
            $(".responseusermsg").html("Please Fill In the email Column");
          }
          if ($("#sec").val().length == 0) {
            isempty = false;
            console.log("0 word");
            $("#sec").css("border", "2px solid red");
            $("#secc").html("Please Fill In the Security Code Column");
          }
        else if($("#email").val().length != 0 && $("#pwd1").val().length != 0 && $("#pwd2").val().length != 0&& $("#sec").val().length != 0){
          isempty = true;
          }
          console.log(passwordproblem);
          console.log(emailexist);
          console.log(isempty);
  
          
  
      if(emailexist==true&&passwordproblem==true&&isempty==true){
        $(location).prop('href', 'index.html');
  
      };
      });
    });