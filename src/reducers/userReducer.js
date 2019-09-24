import { userActions as ActionTypes } from "../actions";

const initialState = {
    loggedIn: false
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                username: action.payload.username,
                // username: action.payload.userTitle
            };

        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                loggedIn: false
            };

        default:
            return state;
    }
}
export default userReducer;