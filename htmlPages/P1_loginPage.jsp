<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- To disable back button  -->
	<%-- <%
		response.setHeader("Pragma","no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Expires","0");
		response.setDateHeader("Expires",-1);
	%> --%>
	
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" 
         integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	
	<!-- CDN FOR SHOW BUTTON ICON -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />	
	
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	
	<!-- TO PUT SHOW ICON OF EYE INSIDE THE TEXT FILED -->
		<style>
		form i 
		{
			margin-left: -30px;    /* 350px for right corner */
			cursor: pointer;
		}
	</style>
	
	
	<!-- CDN FOR SWEET ALERT  -->
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	

    <title>LOGIN FORM</title>
  </head>
 <!--  <body background="https://wallpaperaccess.com/full/2314983.jpg"> -->
  <!-- <body background="https://assets-global.website-files.com/5e39e095596498a8b9624af1/5fdcabfbe1fbb07ad27b11ac_New-Nested-symbols.jpg"> -->
    <body background="image/bgi y.jpg">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
            <!-- Form Design start -->
            
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                <form action="P2_loginServer.jsp" style="background-color: rgba(240, 240, 240, 0.35); border-radius: 10px;
                              border:2px solid rgb(19, 18, 18); padding: 30px; margin-top:100px;" >                						
							
                  <!-- SCRIPTLET FOR LOGIN FAIL MESSAGE = START -->                 
                  <% String sesuser=(String)session.getAttribute("sesuser");
						if(sesuser==null)
						  {
									
						  }
						else
						  {
										
							%>									
							<script >swal("<%=sesuser%>", " Wrong Credential!", "error");</script>
							<% 
							session.setAttribute("sesuser", null);
						  }
							 %>
							 
                   <!-- SCRIPTLET FOR LOGIN FAIL MESSAGE = END -->
   
                    <div class="form-group">
                        
                        <h3>LOGIN</h3>
                        <br>
                        <label ><strong>Username</strong> </label>
                        <br>
                         <!-- class="form-control" is used for showing text box below the label ELSE it will show in  inline -->
                        <input class="form-control" type="text" name="username" placeholder="type Email or Username ">
                        <!-- 
                          use to show faint text message 
                          <small id="helpId" class="text-muted">Help text</small> -->

                        <br>
                     </div>
                        
                    <label><strong>Password</strong> </label>
                        <br>     
                                           
                        <input type="password" name="password"  placeholder=" type password" id="password">
                        <!-- IF WE USE FORM CONTROL IT SHOW EYE OUTSIDE THE TEXT FIELD
                        <input class="form-control" type="password" name="password"  placeholder="type password" id="password">
                          -->
                        <i class="bi bi-eye-slash" id="togglePassword"></i>
                        <br>
                        <br>         
                        <br>                       
                        <button type="submit" class="btn btn-secondary btn-lg btn-block">Login</button>
                        
                        <hr style="height:3px; border-width:0; color:black;  background-color:black;">
                        <a href="P5_forgotPassword.jsp"><b>Forget Password /</b></a> &nbsp;
                        
                        <a href="P3_signup.jsp"><b>SignUp</b></a> &nbsp;

                    
                </form>
                
            </div>
            
            <!-- Form Design End -->
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 "></div>
        </div>
    </div>
    
    <script>
		const togglePassword = document.querySelector('#togglePassword');
		const password = document.querySelector('#password');

		togglePassword.addEventListener('click', function() 
		{
			// Toggle the type attribute using
			// getAttribure() method
			const type = password.getAttribute('type') === 'password' ? 'text' : 'password';				
			password.setAttribute('type', type);			
			/* OR we can write in double inverted comma also
			const type = password.getAttribute("type") === "password" ? "text" : "password";
			  password.setAttribute("type", type);  */

			// Toggle the eye and bi-eye icon
			this.classList.toggle('bi-eye');
			
		});
	</script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
     integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

  </body>
</html>