//import { getData } from "../requests/request";

function checkLogin() {
  let { AUTH_TOKEN, LOGGED_IN_USER } = sessionStorage;
  if (AUTH_TOKEN && LOGGED_IN_USER) {
    return true;
  } else {
    return false;
  }
}

function login(username, password) {
  let baseUrl = "http://localhost:55960/"; // TODO: code this into ENV file
  let apiPath = "api/PrincipalUser";
  let tryToken = `Basic ${btoa(username + ":" + password)}`;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": tryToken
    },
  };
  return fetch(baseUrl + apiPath, requestOptions)
    .then(response => {
      if (response.ok) {
        // login successful
        sessionStorage.setItem("AUTH_TOKEN", tryToken);
        return response.json();
      }
      // else throw response
      throw response;
    })
    .then(user => sessionStorage.setItem("LOGGED_IN_USER", JSON.stringify(user[0])))
    .catch(err => console.error(err));
}

function logout() {
  // remove user from session storage to log user out
  let { AUTH_TOKEN, LOGGED_IN_USER } = sessionStorage;
  if (AUTH_TOKEN && LOGGED_IN_USER) {
    sessionStorage.removeItem("AUTH_TOKEN");
    sessionStorage.removeItem("LOGGED_IN_USER");
  }
}


export {
  login,
  logout,
  checkLogin,
};