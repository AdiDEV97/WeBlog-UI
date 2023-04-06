import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../StyledComponent/Style.css';
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../../../Auth";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import FeedsComponent from "../../Feeds/Component/FeedsComponent";
import { getUserProfileImageApi } from "../Service/ApiHandler";
import { BASE_URL } from "../../../Services/ApiHandler";

const HeaderComponent = ({ direction}) => {
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(undefined);

  const [role, setRole] = useState();

  const navigate = useNavigate();


  // This state and toggleProfile function is to handle 'UserName' dropdown at the corner
  const [dropdownOpenProfile, setDropdownOpenProfile] = useState(false);
  const toggleProfile = () => setDropdownOpenProfile((prevState) => !prevState);

  // This state and toggleMore function is to handle 'More' dropdown
  const [dropdownOpenMore, setDropdownOpenMore] = useState(false);
  const toggleMore = () => setDropdownOpenMore((prevState) => !prevState);

  const url = localStorage.getItem('D:\My Projects\MyBlog\myblog\src\assets\weblog.png');

  //-------------------------------------------------------------------------------------------------
   // Decode Jwt Token (SAME FUNCTION CODE FOR DECODEING JWT TOKEN)
   function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
//----------------------------------------------------------------------------------------------------

  useEffect(() => {
    setLogin(isLoggedIn());
    const userDetails = getCurrentUserDetails();
    setUser(userDetails);
    login && (setRole(userDetails.roles[0].roleId));
    // Get User Profile Image
    // getUserProfileImageApi(user.profileImage).then((img) => {
    //   console.log('Image Taken!!');
    //   console.log(img);
    // }).catch(err => {console.log('Error in Image - ' + err);})

    if(login) { // Checking if logged-In or not. If Logged-In then we check for Jwt Token is expired or not
      const token = JSON.parse(localStorage.getItem('data')).token;
      const decodedToken = parseJwt(token);
      if(decodedToken.exp >= new Date().getTime()) {
        console.log("JWT Token Expired!!");
        doLogout(() => {
          navigate("/login");
          toast.error("Session Expired!! Please Login again.", { position: toast.POSITION.BOTTOM_CENTER });
          console.log("Session Expired!! Please Login again.");
          setUser(undefined);
          setLogin(false);
        });
      }
    }

  }, [login]);


  const handleLogout = () => {
    doLogout(() => {
      navigate("/login");
      toast("Logout Successfull", { position: toast.POSITION.BOTTOM_CENTER });
      console.log("Logged Out!!");
      setUser(undefined);
      setLogin(false);
    });
  };

  console.log("Login Check - ");
  console.log(login);

  console.log("Current User Details - ");
  console.log(user);

  console.log("Current User Role - ");
  console.log(role);

  return (
    <div className="header fixed-tops">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Weblog
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            {/* <li className="nav-item active">
              <Link className="nav-link" to="/user/dashboard">
                Dashboard
              </Link>
            </li> */}

            <li className="nav-item active">
              <Link className="nav-link" to="/user/my-feeds">
                My Feeds
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/user/new-story">
                New Story
              </Link>
            </li>

            {
              role==501 && login && (
                <>
                  {/* <li className="nav-item active">
                    <Link className="nav-link" to="/user/test">
                      Testing
                    </Link>
                  </li> */}

                  <li className="nav-item active">
                  <Link className="nav-link" to="/user/categories">
                    Categories
                  </Link>
                </li>
                </>
              )
            }

            <li>
              <Dropdown
                className="drop"
                isOpen={dropdownOpenMore}
                toggle={toggleMore}
                direction={direction}
              >
                <DropdownToggle caret color="dark">
                  More
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                    <a className="text-dark" style={{ textDecoration: "none" }} disabled>Contact Us</a>
                  </DropdownItem>
                  <DropdownItem divider />
                  
                  <DropdownItem>
                    <a
                      className="text-dark"
                      href="https://www.linkedin.com/in/adeshvaidya/"
                      style={{ textDecoration: "none" }}
                    >
                      LinkedIn
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a
                      className="text-dark"
                      href="https://github.com/"
                      style={{ textDecoration: "none" }}
                    >
                      GitHub
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a
                      className="text-dark"
                      href="https://www.youtube.com/@WeblogApplication/featured"
                      style={{ textDecoration: "none" }}
                    >
                      Youtube
                    </a>
                  </DropdownItem>
                  
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>

          {/* If LoggedIn then show below block */}
          {login && (
            <>
              <img className="profileImg rounded-circle" src={`${BASE_URL}/user/profile-image/${user.profileImage}`} alt="ProfileImage" width="40" height="40" />
              <Dropdown
                className="drop"
                isOpen={dropdownOpenProfile}
                toggle={toggleProfile}
                direction={direction}
              >
                <DropdownToggle caret color="dark" size="lg">
                  {user.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link
                      className="text-dark"
                      to="/user/profile"
                      style={{ textDecoration: "none" }}
                    >
                      Your Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          {/* If LoggedOut then show below column */}
          {!login && (
            <>
              <Link className="nav-link text-light" to="/login">
                Login
              </Link>

              <Link className="nav-link text-light" to="/signup">
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
