import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Wait from "../layout/Waiting/Wait.js";
import MailOutline from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../allActions/peopleAction";
import Swal  from "sweetalert2"; 
import Label from "../layout/Label";
     
const ForgotPassword = () => { 
  const dispatch = useDispatch(); 
 

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        text: 'error occur'
      })
      dispatch(clearErrors());
    }

    if (message) {
      Swal.fire({
        text: 'link send to email'
      }) 
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Wait /> 
      ) : (
        <Fragment>
        <Label title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div> 
        </div>
      </Fragment>
    )}


    </Fragment> 
    
    
  );
};
export default ForgotPassword;
