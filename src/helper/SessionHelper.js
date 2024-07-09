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
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setOTP(otp) {
    localStorage.setItem("otp", otp);
  }
  getOTP() {
    return localStorage.getItem("otp");
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
