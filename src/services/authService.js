import api from "../api/axios";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;  // { user_id, name, role, ... }
};
