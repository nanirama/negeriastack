export const checkStatus = async response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 500) {
    return response
      .json()
      .then(errorData => {
        const message = (errorData || {}).error;
        const error = new TypeError(message || "Server error");
        throw error;
      })
      .catch(error => new TypeError("Server Error"));
  }
  if (response.status === 401) {
    const res = await response.json();
    const error = {
      status: response.status,
      data: res.message ? res : { message: response.statusText }
    };
    throw error;
  }
  return response.json().then(errorData => {
    const error = {
      status: response.status,
      data: { messgae: errorData }
    };
    throw error;
  });
};

export const parseJSON = async response => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const { status } = response;
    response = { data: await response.json(), status };
    return { ...response, status };
  }
  return null;
};
