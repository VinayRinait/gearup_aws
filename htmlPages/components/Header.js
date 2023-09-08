const Header = () => {
  return `
  <meta charset="ISO-8859-1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta
  name="description"
  content="Responsive Bootstrap4 Shop Template, Created by Imran Hossain from https://imransdesign.com/"
/>
<!-- basic -->
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- mobile metas -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1" />
<!-- site metas -->
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="author" content="" />

<link rel="shortcut icon" type="image/png" href="../assets/img/favicon.png" />
<!-- google font -->
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap"
  rel="stylesheet"
/>
<!-- fontawesome -->
<link rel="stylesheet" href="../assets/css/all.min.css" />
<!-- bootstrap -->
<link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css" />
<!-- owl carousel -->
<link rel="stylesheet" href="../assets/css/owl.carousel.css" />
<!-- magnific popup -->
<link rel="stylesheet" href="../assets/css/magnific-popup.css" />
<!-- animate css -->
<link rel="stylesheet" href="../assets/css/animate.css" />
<!-- mean menu css -->
<link rel="stylesheet" href="../assets/css/meanmenu.min.css" />
<!-- main style -->
<link rel="stylesheet" href="../assets/css/main.css" />
<!-- responsive -->
<link rel="stylesheet" href="../assets/css/responsive.css" />
<!-- bootstrap css -->
<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css" />
<!-- style css -->
<link rel="stylesheet" type="text/css" href="../css/style.css" />
<!-- Responsive-->
<link rel="stylesheet" href="../css/responsive.css" />
<!-- fevicon -->
<link rel="icon" href="/images/fevicon.png" type="image/gif" />
<!-- Scrollbar Custom CSS -->
<link rel="stylesheet" href="../css/jquery.mCustomScrollbar.min.css" />
<!-- Tweaks for older IEs-->
<link
  rel="stylesheet"
  href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
/>
<!-- fonts -->
<link
  href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap"
  rel="stylesheet"
/>
<!-- font awesome -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<!--  -->
<!-- owl stylesheets -->
<link
  href="https://fonts.googleapis.com/css?family=Great+Vibes|Poppins:400,700&display=swap&subset=latin-ext"
  rel="stylesheet"
/>
<link rel="stylesheet" href="../css/owl.carousel.min.css" />
<link rel="stylesheet" href="../css/owl.theme.default.min.css" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css"
  media="screen"
/>

<!-- Payment Page meta and link -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<!-- TITLE -->
<title>Bloomb</title>

<!-- JQUERY CDN    if doesn't worked bootstrap 2 jquery cnd at bottom then use this CDN-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- FONT AWESOME CDN -->
<script
  src="https://kit.fontawesome.com/9ccd7bd56c.js"
  crossorigin="anonymous"
></script>

<!-- CDN FOR SWEET ALERT  -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<!-- CDN FOR SHOW BUTTON ICON ON LOGIN Form -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
/>

<!-- MD BOOTSTRAP CDN for contact us form 
<link
	href="https://cdn.jsdelivr.net/npm/mdbootstrap@4.20.0/css/mdb.min.css"
	rel="stylesheet">
	-->
<body>
  <div class="row">
    <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div
        class="jumbotron"
        style="background-color: rgb(28, 28, 41); border: yellow"
      >
        <!-- logo section start -->
        <div class="logo_section">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <b style="color: rgb(255, 255, 255); font-size: 25px">BLOOMB</b
                >&nbsp;&nbsp;&nbsp;&nbsp;<a
                  href="adminDashboard"
                  type="submit"
                  class="btn btn-outline-warning"
                  style="color: white"
                  ></a
                >
                <!-- <div class="logo"><a href="index.html"><img src="images/logopng"></a></div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- logo section end -->
        <br />
        <br />

        <!-- Navbar Start -->
        <nav
          class="navbar navbar-expand-lg bg-primary navbar-dark sticky-top py-lg-0 px-lg-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <a href="#" class="navbar-brand ms-3 d-lg-none">MENU</a>
          <button
            type="button"
            class="navbar-toggler me-3"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav me-auto p-3 p-lg-0"></div>
          </div>
        </nav>
        <!-- Navbar End -->

        <!-- HEADER SECTION = START -->

        <div class="header_section">
          <div class="container">
            <div class="containt_main">
              <div id="mySidenav" class="sidenav">
                <a
                  href="javascript:void(0)"
                  class="closebtn"
                  onclick="closeNav()"
                  >&times;</a
                >
                <a href="../index.html">Home</a>
                <a href="../pv13_userAccount.html">Your Account</a>
                <a href="../pv17_contactUs.html">Contact Us</a>
              </div>
              <span class="toggle_icon" onclick="openNav()"
                ><img src="/images/toggle-icon.png"
              /></span>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All Category
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="./p2_mixflower.html"
                    >Mix Flowers</a
                  >
                  <a class="dropdown-item" href="./p3_bookey.html">Bookey</a>
                  <a class="dropdown-item" href="./p4_haar.html">Haar/Warmala</a>
                  <a class="dropdown-item" href="./p5_gajra.html">Gajra</a>
                </div>
              </div>
              <div class="main">
                <!-- Another variation with a button -->
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search your beautiful fragnance"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      style="background-color: #f26522; border-color: #f26522"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="header_box">
                <!-- <div class="lang_box ">
									<a href="#" title="Choose Language" class="nav-link"
										data-toggle="dropdown" aria-expanded="true"> <img
										src="images/flag-uk.png" alt="flag" class="mr-2 "
										title="India"> English <i class="fa fa-angle-down ml-2"
										aria-hidden="true"></i>
									</a>
									<div class="dropdown-menu ">
										<a href="#" class="dropdown-item"> Hindi </a> <a href="#"
											class="dropdown-item"> Marathi </a> <a href="#"
											class="dropdown-item"> Bengali </a> <a href="#"
											class="dropdown-item"> Tamil </a> <a href="#"
											class="dropdown-item"> Telgu </a>
									</div>
								</div> -->

                <div class="login_menu">
                  <ul>
                    <li>
                      <a href="./pv12_cart.html">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="padding_10">Cart</span></a
                      >
                    </li>
                    <li>
                      <a href="./p7_signup.html">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span class="padding_10">Sign Up/In</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- HEADER SECTION = END -->
      </div>
    </div>
  </div>
</body>


<!-- FOR LOGIN Form Eye -->

  `;
};

export default Header;
