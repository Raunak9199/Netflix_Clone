import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import NetflixButton from "../components/NetflixButton";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { login, isLogin } = useAuthStore();

  // Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(identifier, password);
    login({ identifier, password });
  };
  return (
    <div className="h-screen w-full hero-bg">
      {/* Header NETFLIX Logo to get to home page */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      {/* Input From for Signup */}
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-boldmb-4">
            Log In
          </h1>

          {/* Form start */}
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="identifier"
                className="text-sm font-medium text-gray-300 block"
              >
                Email / Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="john@example.com | johndoe_"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="•••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <>
                      <EyeOff size={16} className="mr-1" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye size={16} className="mr-1" /> Show
                    </>
                  )}
                  {/* {showPassword ? (
                <span className="text-xs">Hide</span>
              ) : (
                <span className="text-xs">Show</span>
              )} */}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <NetflixButton loading={isLogin}>Log In</NetflixButton>
            {/*  <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Log In
            </button> */}
          </form>

          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
