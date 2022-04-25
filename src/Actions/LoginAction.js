import API from "../Api";
export function loginUser(data) {
    console.log('data login actions',data)
  return dispatch =>
        dispatch({
          type: "LOGIN_SUCCESS",
          data: data
        });
}
export function logout() {
  console.log("came to logout")
  return {
    type: "LOGOUT",
    data: {}
  };
}


export function setUserDetails(data) {
  return {
    type: "SET_USER_DETAILS",
    data
  };
}

export function forgotPassword(data, callback) {
  return dispatch =>
    API.forgotPassword.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}


export function validateToken(data,callback){
  return dispatch =>
  API.validateToken.post(null, { ...data }).then(
    result => {
      callback(null, result);
    },
    err => callback(err)
  );
}


