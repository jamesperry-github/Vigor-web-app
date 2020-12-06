export function checkLogin() {
  let { AUTH_TOKEN, LOGGED_IN_USER } = sessionStorage;
  if (AUTH_TOKEN && LOGGED_IN_USER) {
    return true;
  } else {
    return false;
  }
}

export function login(username, password) {
  let baseUrl = "http://localhost:55960/"; // TODO: code this into ENV file
  let apiPath = "api/GetPrincipalUser";
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
        let res = response.json();
        sessionStorage.setItem("AUTH_TOKEN", tryToken);
        return [response, res];
      }
      return response;
    })
    .catch(err => console.error(err));
}

export function logout() {
  // remove user from session storage to log user out
  let { AUTH_TOKEN, LOGGED_IN_USER } = sessionStorage;
  if (AUTH_TOKEN && LOGGED_IN_USER) {
    sessionStorage.removeItem("AUTH_TOKEN");
    sessionStorage.removeItem("LOGGED_IN_USER");
  }
}