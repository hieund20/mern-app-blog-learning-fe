import { Avatar } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Comment = (props) => {
  const { userLogged } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submit form", data);

    const newComment = {};

    await dispatch();
  };

  return (
    <>
      <div>
        <Avatar
          alt={userLogged?.displayName}
          src={userLogged?.photoURL}
          sx={{ marginRight: "8px" }}
        />
        <div>{userLogged?.displayName}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          type="text"
          {...register("comment", { required: true })}
          placeholder="Nhập nội dung bình luận..."
        />
        {errors.comment && (
          <p className="error-message">This field is required</p>
        )}

        <div>
          <input type="submit" value="Gửi bình luận" />
        </div>
      </form>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </>
  );
};

export default Comment;
