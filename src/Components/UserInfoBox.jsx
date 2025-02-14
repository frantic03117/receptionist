// import React from "react";
import {  Box } from "@mui/material";
import PropTypes from "prop-types";

export default function UserInfoBox({user}) {
    console.log(user)
  return (
    <Box className="*:text-xs"  sx={{ overflow: "hidden" }}>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>     
    </Box>
  );
}

UserInfoBox.propTypes = {
   user :  PropTypes.object
}
