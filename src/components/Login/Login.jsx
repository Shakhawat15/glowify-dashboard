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

    console.log("Email: ", email);
    console.log("Password", password);

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address is Required!");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is Required!");
    } else {
      setLoading(true);
      await LoginRequest(email, password, setLoading).then((result) => {
        setLoading(false);
        if (result) {
          // navigate("/");
          // window.location.reload();
          window.location.href = "/";
        }
      }).catch(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              ref={passRef}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>
          <button
            onClick={SubmitLogin}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log in
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="#" className="text-indigo-600 hover:text-indigo-700">Sign up</a></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
