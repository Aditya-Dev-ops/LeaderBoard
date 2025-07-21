import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../api/AuthApi";
import   {setCredentials}  from "../slices/authSlice";
import Loader from "../components/Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSeen, setIsPasswordSeen] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      console.log(res);
      if (res?.token && res?.user) {
        dispatch(setCredentials({ token: res.token, user:res.user }));
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    } catch (error) {
        console.log(error)
      setIsError(true);
      setEmail("");
      setPassword("");
      setTimeout(() => setIsError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] flex items-center justify-center bg-gradient-to-tr from-blue-400 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>

        {/* Email Field */}
        <div className="block mb-4 text-gray-700">
          <span className="text-sm">Email</span>
          <div className="mt-1 relative">
            <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 pr-3 py-2 w-full border-b ${isError ? "border-red-600" : "border-gray-300"} focus:outline-none focus:border-blue-500 transition`}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="block mb-2 text-gray-700">
          <span className="text-sm">Password</span>
          <div className="mt-1 relative">
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={isPasswordSeen ? "text" : "password"}
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-3 py-2 w-full border-b ${isError ? "border-red-600" : "border-gray-300"} focus:outline-none focus:border-blue-500 transition`}
              required
            />
            {password.length > 2 && (
              <button
                className="absolute right-8 top-1/2 -translate-y-1/2 opacity-45"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordSeen((prev) => !prev);
                }}
              >
                {isPasswordSeen ? <Eye size={16} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full min-h-[30px] flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          {isLoading ? <Loader size="10" /> : "LOGIN"}
        </button>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Or Sign Up Using
          <div className="mt-2">
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              SIGN UP
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}