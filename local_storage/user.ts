export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const setUser = (user: string) => localStorage.setItem("user", user);
export const removeUser = () => localStorage.removeItem("user");
