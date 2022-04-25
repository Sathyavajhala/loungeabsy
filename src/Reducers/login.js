const initialState = {
loginSuccess: '',
isLoggedIn: false,
loginError:'',
}
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
            ...state,
            loginSuccess: action.data,
            isLoggedIn: true
          };
  
      case "LOGIN_ERROR":
        return {
          ...state,
          loginError: action.data
        };
      case "LOGOUT":
        return {
            ...state,
            loginError: '',
            isLoggedIn: false
          };
      default:
        return state;
    }
  }
  