import { commonActions, commentActions } from "../actions";

import Swal from "sweetalert2";

const initialState = {
  version: "2.0",
  error: false,
  message: "",
  serverError: false,
  loading: false
};

// global errors and messages
function commonReducer(state = initialState, action) {
  const { type, error, message, serverError, loading } = action;
  if (loading) {
    console.log(loading);
    return {
      ...state,
      loading: loading
    };
  }
  if (serverError) {
    return {
      ...state,
      error: true,
      serverError: true,
      message:
        "Our backend is experiencing some downtime. Please refresh, check back later or message an admin."
    };
  }
  if (error) {
    if (error.response && error.status == 401) {
      return {
        ...state,
        error: true,
        message: "Your session expired. Please log back in."
      };
    }
    if (error.response && error.response.status == 403) {
      Swal.fire({
        title: "Not authorized",
        html:
          'You are not in the group of authorized users for this page. If you would like to request access, please email <a href="mailto:someone@yoursite.com?subject=Sample Receiving Site Access Request">the Sample Receiving Team.</a>',
        type: "info",

        animation: false,
        confirmButtonColor: "#007cba",
        confirmButtonText: "Dismiss"
      });
      return {
        ...state
      };
    } else {
      return {
        ...state,
        error: true,
        message: action.error.response
          ? action.error.response.data.message
          : action.error.message
      };
    }
  }
  if (message) {
    if (message == "reset") {
      return {
        ...state,
        message: ""
      };
    } else {
      return {
        ...state,
        message: action.message
      };
    }
  } else {
    return {
      ...state,
      loading: false
    };
  }
}

export default commonReducer;
