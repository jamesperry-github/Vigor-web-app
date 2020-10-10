function manageData(apiPath, method = "GET", dto = {}) {
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
  return fetch(baseUrl + apiPath, data)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response;
    })
    .catch(err => console.error(err));
};

function getData(apiPath) {
  return manageData(apiPath);
}

function postData(apiPath, payload) {
  return manageData(apiPath, "POST", payload);
}

export {
  getData,
  postData,
};