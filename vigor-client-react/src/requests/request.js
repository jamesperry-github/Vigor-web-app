function manageData(path, method = "GET", dto = {}, isEdamam = false) {
  let baseUrl = 'http://localhost:55960/';
  let data = {
    method: method,
    body: JSON.stringify(dto),
    headers: {
      "Authorization": sessionStorage.AUTH_TOKEN,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };
  if (method === "GET") {
    // delete this obj key if we only want to read data
    delete data.body
  }
  let apiPath = !isEdamam ? baseUrl + path : path;
  return fetch(apiPath, data)
    .then(response => {
      if (response.ok) {
        if(method === "GET") {
          return response.json();
        } else {
          return response;
        }
      }
      return response;
    })
    .catch(err => console.error(err));
};

function getData(path, isEdamam) {
  return manageData(path, "GET", {}, isEdamam);
}

function postData(path, payload) {
  return manageData(path, "POST", payload);
}

function destroyData(path, payload) {
  return manageData(path, "DELETE", payload);
}

function putData(path, payload) {
  return manageData(path, "PUT", payload);
}

export {
  getData,
  postData,
  destroyData,
  putData,
};