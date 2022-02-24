export const login = async (history, data) => {
  console.log(data);
  localStorage.setItem("auth", JSON.stringify(data));
 
  history.push("admin-logged-addpet");

};

export const logout = () => {
  localStorage.removeItem("auth");
};

export const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};
