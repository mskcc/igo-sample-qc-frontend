import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   generateSubmitData,
//   generateSubmissionsGrid,
//   findSubmission,
//   submissionExists,
//   checkGridAndForm,
// } from '../helpers'

import { Config } from "../secret_config.js";

// // Add a request interceptor
// axios.interceptors.request.use(
//   config => {
//     let token = sessionStorage.getItem("access_token");
//     if (token && !config.headers["Authorization"]) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },

//   error => {
//     return Promise.reject(error);
//   }
// );

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAL = "ADD_COMMENT_FAL";

export function addComment(comment) {
  return (dispatch, getState) => {
    let commentToSave = {
      comment: comment.comment,
      username: getState().user.username,
      user_title: "project manager",
      request_id: getState().report.request.requestId,
      qc_table: "dna"
    };

    dispatch({ type: ADD_COMMENT });
    return axios
      .post(Config.API_ROOT + "/addComment", { data: commentToSave })
      .then(response => {
        return dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        return dispatch({
          type: GET_COMMENTS_FAIL,
          error: error
        });
      });
  };

  //ceep copy of comments array
  // let comments = [...getState().communication.comments];
  // comments.push(comment);
}

export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export function getComments() {
  return (dispatch, getState) => {
    dispatch({ type: GET_COMMENTS });
    return axios
      .get(Config.API_ROOT + "/getComments", {
        data: { request_id: getState().report.request.requestId }
      })
      .then(response => {
        return dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        return dispatch({
          type: GET_COMMENTS_FAIL,
          error: error
        });
      });
  };
}
