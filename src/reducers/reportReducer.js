import { reportActions as ActionTypes } from "../actions";

const initialState = {
  loaded: false
};

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_REQUEST_SUCCESS:
      return {
        ...state
      };

    case ActionTypes.GET_REQUEST_FAIL:
      return {
        ...state
      };

    case ActionTypes.GET_REPORT_SUCCESS:
      return {
        ...state,
        loaded: true
      };

    case ActionTypes.GET_REPORT_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}

export default reportReducer;
