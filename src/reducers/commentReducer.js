import { commentActions as ActionTypes } from "../actions";

const initialState = {
  comments: []
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...action.payload]
      };

    case ActionTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...action.payload.comments]
      };

    case ActionTypes.GET_COMMENTS_FAIL:
      return {
        ...state
      };
    case ActionTypes.REFRESH_TOKEN_VALID:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        isSaving: false,

        username: action.payload.username
        // message: 'Welcome back, ' + action.payload.username + '.',
      };

    case ActionTypes.REFRESH_TOKEN_INVALID:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        username: ""
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        username: action.payload.username,
        role: action.payload.role,
        submissionsTable: action.table,
        submissions: action.payload.submissions
        // message: action.payload.message,
      };

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        loading: false
      };

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState
      };

    case ActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loggedIn: true
        // loading: false,
        // message: action.message,
      };

    case ActionTypes.GET_SUBMISSIONS:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_SUBMISSIONS_FAIL:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.GET_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        submissionsTable: action.payload.table,
        submissions: action.payload.submissions,
        loading: false
      };

    case ActionTypes.SAVE_PARTIAL_SUBMISSION:
      return {
        ...state,
        isSaving: true
      };
    case ActionTypes.SAVE_PARTIAL_SUBMISSION_FAIL:
      return { ...state, isSaving: false };
    case ActionTypes.SAVE_PARTIAL_SUBMISSION_CANCEL:
      return { ...state, isSaving: false };
    case ActionTypes.SAVE_PARTIAL_SUBMISSION_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saved: true,
        submissionsTable: action.payload.table,
        submissions: action.payload.submissions
      };

    case ActionTypes.EDIT_SUBMISSION:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.EDIT_SUBMISSION_FAIL:
      return { ...state, loading: false };

    case ActionTypes.EDIT_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ActionTypes.DELETE_SUBMISSION:
      return {
        ...state,
        isSaving: true
      };
    case ActionTypes.DELETE_SUBMISSION_FAIL:
      return { ...state, isSaving: false };
    case ActionTypes.DELETE_SUBMISSION_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saved: true,

        submissionsTable: action.payload.table,
        submissions: action.payload.submissions
      };

    case ActionTypes.BUTTON_RESET: {
      return { ...state, submitted: false, saved: false };
    }

    default:
      return state;
  }
}

export default commentReducer;
