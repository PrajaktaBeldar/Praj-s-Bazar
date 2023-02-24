import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Wait from "../layout/Waiting/Wait";
import MailOutline from "@mui/icons-material/MailOutline";
import Face from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearErrors, updateProfile, loadUser } from "../../allActions/peopleAction";
import Swal  from "sweetalert2";

import { UPDATE_PROFILE_RESET } from "../../Steady/userSteady";
import Label from "../layout/Label";
 
const UpdateProfile = () => {
  const dispatch = useDispatch();

  const navigate= useNavigate();
  const { user } = useSelector((state) => state.user);
  const {  error,isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
 
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => { 
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

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
      dispatch(loadUser());

      navigate("/account");
 
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, user,error, isUpdated]);
  return (
    <Fragment>
      {loading ? (
       <Wait/>
      ) : (
        <Fragment>
          <Label title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <Face />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutline/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
