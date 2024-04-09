import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useState, useEffect } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";


const Header = ({children,  hasHiddenAuthButtons}) => {

  // const [login, setLogin] = useState(!!localStorage.getItem('username'));
  // const [username, setUsername] = useState(localStorage.getItem('username'));
  // const [logout, setLogout] = useState(false);
  const history = useHistory();

  // console.log(hasHiddenAuthButtons)

   const logOut = () => {
    //  setLogin(false);
    //  setLogout(true);
    //  localStorage.removeItem('username')
    //  localStorage.removeItem('token')
    //  localStorage.removeItem('balance')
     localStorage.clear();
    //  console.log("logOut called");
     window.location.reload()
    
   }
  
  if (hasHiddenAuthButtons)
  {
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <div>
          
           <Button
              className="explore-button"
              startIcon={<ArrowBackIcon />}
              variant="text"
              onClick={() => history.push("/", { from: "HomePage" })}
            >
              Back to explore
            </Button>
          
        </div>
      </Box>
    )
  }

  // if (children)
  // {
  //   return (
  //     <Box mb={2}>
  //       <TextField
  //         size="small"
  //         type="text"
  //         // value={searchInput}
  //         name="search-box"
  //         placeholder="Search for video title"
  //         // onChange={onInputChange}
  //       />
  //     </Box>
  //   )
  // }
  
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <div>          
          {children}       
        ​</div>
        {/* {
          children && 
          <TextField
            size="small"
            type="text"
            value={children.searchInput}
            name="search-box"
            placeholder="Search for items/categories"
            style={{ width: 300 }}
            onChange={event => children.debounceSearch(event, 500)}
          />
        } */}
        <div>
          {
            localStorage.getItem('username') ?
            (
                <div>
                  
                <Button
                  className="explore-button"
                  // startIcon={<Avatar />}
                  variant="text"
                >
                  {/* {getUsername()} */}
                    <img src="avatar.png" alt={localStorage.getItem('username')} />
                    
  
                  {localStorage.getItem('username')}
                </Button>
                  <Button
                  className="explore-button"
                  onClick={logOut}
                  // onClick={() => { history.push("/", { from: "HomePage" }); logOut() }}
                  variant="text"
                >
                  LOGOUT
                </Button>
              </div>
                
            ) :
          
          (
           <div>
            
                <Button
                  className="explore-button"
                  variant="text"
                  onClick={() => history.push("/login", { from: "HomePage" })}
                >
                  
                  {/* {getUsername()} */}
                  Login
                </Button>
                  <Button
                  className="explore-button"
                  variant="text"
                  onClick={() => history.push("/register", { from: "HomePage" })}
                >
                  Register
                </Button>
              
                
            
          
          </div>
          )
        }
         </div>
      </Box>
    );
};

export default Header;
