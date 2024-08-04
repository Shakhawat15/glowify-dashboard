class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  removeSession() {
    localStorage.clear();
    window.location.href = "/";
  }
}

export const {
  setToken,
  getToken,
  setUser,
  getUser,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  removeSession,
} = new SessionHelper();
