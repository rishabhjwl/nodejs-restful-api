$("#submit").click(function(){
  var name=$("#name").val();
  var email=$("#email").val();
  var mobileno=$("#mobileno").val();
  var userData={
    name:name,
    contact:{
      email:email,
      mobileno:mobileno
    }
  }
  window.location="/data?name="+name;
  $.ajax({
    url: "/data",
    type: "post",
    data: userData,
    success: function(resData) {
      console.log(resData);
    }
  });

})
