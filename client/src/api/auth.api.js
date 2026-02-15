import API from "./api.js";
const registerUser = (data) => {
  return API.post("/users/register", data);
};
const loginUser = async (data) => {
  return API.post("/users/login", data);
};
export { registerUser, loginUser };
