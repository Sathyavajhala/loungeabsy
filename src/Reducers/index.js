import { combineReducers } from "redux";
import loginReducer from './login'
const appReducer = combineReducers({
    login: loginReducer,
})

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };
  
  export default rootReducer;