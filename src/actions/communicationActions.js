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
// import { structureComments } from "./helpers";

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

export const ADD_INITIAL_COMMENT = "ADD_INITIAL_COMMENT";
export const ADD_INITIAL_COMMENT_SUCCESS = "ADD_INITIAL_COMMENT_SUCCESS";
export const ADD_INITIAL_COMMENT_FAIL = "ADD_INITIAL_COMMENT_FAIL";

export function addInitialComment(comment, reports, recipients) {
  return (dispatch, getState) => {
    let recipientSet = new Set(recipients);
    recipientSet = Array.from(recipientSet);

    console.log(reports, recipients, comment);
    let commentToSave = {
      comment: {
        content: comment,
        username: getState().user.username
      },
      request_id: getState().report.request.requestId,
      reports: reports.join(),
      recipients: recipientSet.join()
    };

    dispatch({ type: ADD_INITIAL_COMMENT });
    return axios
      .post(Config.API_ROOT + "/addAndNotifyInitial", { data: commentToSave })
      .then(response => {
        return dispatch({
          type: ADD_INITIAL_COMMENT_SUCCESS,
          payload: response.data.comments
        });
      })
      .catch(error => {
        return dispatch({
          type: ADD_INITIAL_COMMENT_FAIL,
          error: error,
          message: "Sending initial comment failed."
        });
      });
  };

  //ceep copy of comments array
  // let comments = [...getState().communication.comments];
  // comments.push(comment);
}

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAIL = "ADD_COMMENT_FAIL";

export function addComment(comment, reports) {
  return (dispatch, getState) => {
    let recipients = [];
    let recipientSet = [];
    if (reports === "all") {
      reports = Object.keys(getState().report.tables);
      for (let report in reports) {
        let reportRecipients = getState().communication.comments[
          reports[report]
        ].recipients.split(",");
        recipientSet = new Set([...recipients, ...reportRecipients]);
        
      }
      recipients = Array.from(recipientSet);
    } else {
      recipients = getState().communication.comments[reports].recipients;
    }

    let commentToSave = {
      comment: {
        content: comment,
        username: getState().user.username
      },
      request_id: getState().report.request.requestId,
      reports: reports,
      recipients: recipients
    };

    dispatch({ type: ADD_COMMENT });
    return axios
      .post(Config.API_ROOT + "/addAndNotify", { data: commentToSave })
      .then(response => {
        return dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: response.data.comments
        });
      })
      .catch(error => {
        return dispatch({
          type: ADD_COMMENT_FAIL,
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
        params: {
          request_id: getState().report.request.requestId
        }
      })
      .then(response => {
        return dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: response.data.comments
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

export const SET_RECIPIENTS = "SET_RECIPIENTS";
export function setRecipients(recipients) {
  return dispatch => {
    dispatch({ type: SET_RECIPIENTS, payload: recipients });
  };
}
