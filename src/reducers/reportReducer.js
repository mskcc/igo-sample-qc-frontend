import { reportActions as ActionTypes } from "../actions";

const initialState = {
  loaded: false,
  request: ""
};

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_REQUEST_REQUEST:
      return {
        ...state,
        request: null,
        loaded: false
      };
    case ActionTypes.GET_REQUEST_SUCCESS:
      return {
        ...state,
        request: action.payload,
        loaded: true
      };

    case ActionTypes.GET_REQUEST_FAIL:
      return {
        ...state
      };

    case ActionTypes.GET_REPORT_SUCCESS:
      return {
        ...state,
        tables: action.payload
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
