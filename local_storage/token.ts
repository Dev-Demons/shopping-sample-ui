
export const updateLocalAccessToken = (token: string) => {
  let localStorageUser = JSON.parse(localStorage.getItem("user"));
  localStorageUser.accessToken = token;
  localStorage.setItem("user", JSON.stringify(localStorageUser));
}

export const getToken = () => JSON.parse(localStorage.getItem("token"));
export const setToken = (token: string) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
