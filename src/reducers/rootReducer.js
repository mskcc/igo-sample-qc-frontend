import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'

// import uploadReducer from './upload/uploadReducer'
import commentReducer from './commentReducer'
// import userReducer from './user/userReducer'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import sessionStorage from 'redux-persist/lib/storage/session' // defaults to localStorage for web and AsyncStorage for react-native

// import { commonActions } from '../actions'

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['communication', 'user'],
}

const appReducer = combineReducers({
  // upload: uploadReducer,
  communication: commentReducer,
  // user: userReducer,


  localize: localizeReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    console.log('goodbye')
    state = {
      upload: undefined,
      user: undefined,
      comments: undefined,
      localize: state.localize,
    }
  }

  return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer)
