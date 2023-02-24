import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Wait from "../layout/Waiting/Wait";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../allActions/peopleAction";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from "../../Steady/userSteady";
import LockOpen from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock";
import VpnKey from "@mui/icons-material/VpnKey"; 
import Label from "../layout/Label";
import Swal  from "sweetalert2"; 

const UpdatePassword = () => { 
  const dispatch = useDispatch();
 
  const navigate= useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        text: 'error occur'
      })
      dispatch(clearErrors()); 
    }

    if (isUpdated) {
      Swal.fire({
        text: 'Profile Updated Successfully'
      }) 

    navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Wait />
      ) : (
        <Fragment>
          <Label title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKey/>
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock/>
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
