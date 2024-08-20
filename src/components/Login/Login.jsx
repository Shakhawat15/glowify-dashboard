import { useRef, useState } from "react";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { LoginRequest } from "../../API/userAPI";
import Loader from "../MasterLayout/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  // const navigate = useNavigate();

  const SubmitLogin = async () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address is Required!");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is Required!");
    } else {
      setLoading(true);
      await LoginRequest(email, password, setLoading)
        .then((result) => {
          setLoading(false);
          if (result) {
            // navigate("/");
            // window.location.reload();
            window.location.href = "/";
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa]">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
            Welcome Back
          </h2>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              ref={passRef}
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="********"
            />
          </div>
          <button
            onClick={SubmitLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Log in
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
