import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Wait from "../layout/Waiting/Wait";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../allActions/peopleAction";
import { useNavigate } from 'react-router-dom';
import Label from "../layout/Label";
import LockOpen from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock"; 
import { useParams } from "react-router-dom"; 
import Swal  from "sweetalert2"; 
 
const ResetPassword = ( ) => {
  const dispatch = useDispatch();
 
  const navigate= useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } =useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        text: 'error occur'
      })

      dispatch(clearErrors()); 
    }

    if (success) {
      Swal.fire({
        text: 'Password Updated Successfully'
      })


    navigate("/login"); 
    }
  }, [dispatch, error, success]);

  return (
    <Fragment>
      {loading ? (
        <Wait />
      ) : (
        <Fragment>
          <Label title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div> 
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
