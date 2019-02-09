// import React from "react";
import {createButton} from "react-social-login-buttons";
 
const config = {
  text: "Login with Email",
  icon: "email",
  iconFormat: () => `far fa-envelope`,
  style: { background: "#302f2f" },
  activeStyle: { background: "#000000" }
};
/** My Email login button. */
const EmailLoginButton = createButton(config);
 
export default EmailLoginButton;