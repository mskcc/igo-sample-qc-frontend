import { reportActions as ActionTypes } from "../actions";

const initialState = {
  loaded: false,
  request: "",
  reportShown: null,
};

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_REQUEST_REQUEST:
      return {
        ...state,
        request: {request_id: action.requestId},
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
    console.log(Object.keys(action.payload)[0])
      return {
        ...state,
        tables: action.payload,
        reportShown: Object.keys(action.payload)[0]
      };

    case ActionTypes.GET_REPORT_FAIL:
      return {
        ...state
      };
      case ActionTypes.UPDATE_REPORT_SHOWN:
      return {
        ...state,
        reportShown : action.payload

      };

    default:
      return state;
  }
}

export default reportReducer;
