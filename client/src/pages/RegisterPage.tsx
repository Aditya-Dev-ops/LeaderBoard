
import { useRegisterMutation } from "../api/AuthApi";
import { useState } from "react";
import { Eye, EyeOff , Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



const RegisterPage = () => {
  const [signUpForm , setSignUpForm] = useState<{email:string; username:string; password:string}>({
    email:"",
    username:"",
    password:"",
  })
  const navigate = useNavigate();

  const [ispasswordSeen , setIsPasswordSeen] = useState(false);
  const [isError , setIsError] = useState(false);
  const [Register , {isLoading ,error}] = useRegisterMutation();


  //    trigger on form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const checkSignup = await Register(signUpForm);
      if(checkSignup?.error){
        throw new Error("Error in Signing in from backend");
      }
      if(error){
        throw new Error("Error in Signing in from backend");
      }
      navigate('/login');
    } catch (error) {
        console.log(error);
      setIsError(true);
      setSignUpForm({
        email:"",
        username:"",
        password:"",
      })
      // Clear error after 5 seconds
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }};

  return (
    <div
     className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-blue-400 to-pink-500"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-8">SignUp</h1>
        {/*username field*/}
        <div className="block mb-4 text-gray-700">
          <span className="text-sm">Username</span>
          <div className="mt-1 relative">
            <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Type your username"
              value={signUpForm.username}
              onChange={(e) => setSignUpForm({...signUpForm , username:e.target.value})}
              className={`pl-10 pr-3 py-2 w-full border-b ${isError?"border-red-600":"border-gray-300"} focus:outline-none focus:border-blue-500 transition`}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="block mb-4 text-gray-700">
          <span className="text-sm">Email</span>
          <div className="mt-1 relative">
            <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Type your email"
              value={signUpForm.email}
              onChange={(e) => setSignUpForm({...signUpForm , email:e.target.value})}
              className={`pl-10 pr-3 py-2 w-full border-b ${isError?"border-red-600":"border-gray-300"} focus:outline-none focus:border-blue-500 transition`}
              required
            />
          </div>
        </div>
        
        {/* ProfilePicturUrl
        <div className="block mb-4 text-gray-700 relative">
          <span className="text-sm">Your Image</span>
          <div className="mt-1 relative">
            <ImageDown className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            
          </div>
        </div> */}

        {/* Password Field */}
        <div className="block  text-gray-700 mb-6">
          <span className="text-sm">Password</span>
          <div className="mt-1 relative">
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={ispasswordSeen?"text":"password"}
              placeholder="Type your password"
              value={signUpForm.password}
              onChange={(e) => setSignUpForm({...signUpForm , password:e.target.value})}
              className={`pl-10 pr-3 py-2 w-full border-b ${isError?"border-red-600":"border-gray-300"} focus:outline-none focus:border-blue-500 transition`}
              // className="pl-10 pr-3 py-2 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
              required
            />
           { signUpForm.password.length > 2 ?(
            <button 
             className="absolute right-8 top-1/2 -translate-y-1/2 opacity-45"
              onClick={(e) =>{
              e.preventDefault() 
              setIsPasswordSeen((prev)=> !prev)}}>
              {ispasswordSeen? <Eye size={16}/> : <EyeOff size={20}/> }
            </button>):""
           }
          </div>
        </div>
     

        {/* Login Button */}
        <button
          type="submit"
          className="w-full  rounded-full  min-h-[30px] flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
         {isLoading?<Loader size={"10"}/>:"SingUp"}
        </button>

        {/* Footer Sign In Link */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Or You Have Already Account
          <div className="mt-2">
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage;