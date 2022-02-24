export const login = async (history, data) => {
  console.log(data);
  localStorage.setItem("auth", JSON.stringify(data));
  history.push("/logged");
  // message.success("Login Success");
};

export const logout = () => {
  localStorage.removeItem("auth");
  // message.success("Logout Success");
};

export const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};
