function manageData(path, method = "GET", dto = {}) {
  let baseUrl = 'http://localhost:55960/';
  let data = {
    method: method,
    body: JSON.stringify(dto),
    headers: {
      "Authorization": sessionStorage.AUTH_TOKEN,
      "Content-Type": "application/json",
    }
  };
  if (method === "GET") {
    // delete this obj key if we only want to read data
    delete data.body
  }
  return fetch(baseUrl + path, data)
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

function getData(path) {
  return manageData(path);
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