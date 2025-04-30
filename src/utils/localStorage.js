export const getLocalUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const saveLocalUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeLocalUser = () => {
  localStorage.removeItem("currentUser");
};

export const getAllUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveAllUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
