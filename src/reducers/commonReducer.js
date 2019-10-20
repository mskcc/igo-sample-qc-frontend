import Swal from "sweetalert2";

const initialState = {
  version: "2.0",
  error: false,
  message: "",
  serverError: false,
  loading: false,
  loadingMessage: null
};

// global errors and messages
function commonReducer(state = initialState, action) {
  const { error, message, serverError, loading, loadingMessage } = action;
  if (loadingMessage && loading) {
    console.log(action);
    return {
      ...state,
      loadingMessage: loadingMessage,
      loading: loading
    };
  }
  if (loading) {
    console.log(action);
    return {
      ...state,
      loading: loading
    };
  }

  if (serverError) {
    console.log(action);
    return {
      ...state,
      error: true,
      serverError: true,
      loading: false,
      message:
        "Our backend is experiencing some downtime. Please refresh, check back later or message an admin."
    };
  }
  if (error && !message) {
    console.log(action);
    if (error.response && error.status === 401) {
      console.log(action);
      return {
        ...state,
        error: true,
        message: "Your session expired. Please log back in.",
        loading: false
      };
    }
    if (error.response && error.response.status === 403) {
      console.log(action);
      Swal.fire({
        title: "Not authorized",
        html:
          'You are not in the group of authorized users for this page. If you would like to request access, please email <a href="mailto:someone@yoursite.com?subject=Sample Receiving Site Access Request">the Sample Receiving Team.</a>',
        type: "info",
        loading: false,
        animation: false,
        confirmButtonColor: "#007cba",
        confirmButtonText: "Dismiss"
      });
      return {
        ...state
      };
    }
  }
  if (message) {
    console.log(action);
    if (message === "reset") {
      console.log(action);
      return {
        ...state,
        message: "",
        loading: false
      };
    } else {
      return {
        ...state,
        message: action.message,
        loading: false
      };
    }
  }
  return { ...state };
}

export default commonReducer;
