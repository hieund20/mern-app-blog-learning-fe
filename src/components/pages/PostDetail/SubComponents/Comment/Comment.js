import { Avatar } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postNewComment } from "../../../../../store/actions/commentActions";

const Comment = (props) => {
  const { userLogged, refreshData } = props;
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
  const { id } = useParams();

  const onSubmit = async (data) => {
    console.log("Submit form", data);

    const newComment = {
      content: data.comment,
      postId: id,
      author: userLogged,
      likeCount: 0,
    };

    await dispatch(postNewComment(newComment));
    refreshData();
  };

  console.log("user", userLogged);

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
