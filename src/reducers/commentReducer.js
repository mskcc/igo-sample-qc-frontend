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

    default:
      return state;
  }
}

export default commentReducer;
