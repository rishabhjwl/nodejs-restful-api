$("#submit").click(function(){
  var name=$("#name").val();
  var email=$("#email").val();
  var password=$("#password").val();
  var userData={
    name:name,
    email:email,
    password:password
  }
  $.ajax({
    url: "/api/auth/register",
    type: "post",
    data: userData,
    success: function(resData) {
      if(resData.success){
        window.location="/login";
      }
      else{
        alert('something went wrong')
      }
    }
  });

})
