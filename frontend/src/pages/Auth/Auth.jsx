import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState(true);
  
  return (
    <div className="loginContainer">
      {/* Left side image (on white background) */}
      <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center p-12">
        <img 
          src="https://i.pinimg.com/736x/88/28/6a/88286af024eac74788e4c95b9ecbf275.jpg" 
          alt="Team Collaboration"
          className="h-full w-full object-cover rounded-lg shadow-xl"
        />
      </div>

      {/* Centered auth form that overlaps */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <div className="box h-[32rem] w-[25rem]">
          <div className="login">
            <div className="w-full px-10 space-y-5">
              {/* Logo and WorkWise title */}
              <div className="flex flex-col items-center mb-2">
                <img 
                  src="https://i.pinimg.com/736x/3d/52/c0/3d52c0e851e33f105ea3220a6506736c.jpg" 
                  alt="WorkWise Logo"
                  className="h-16 w-16 object-contain mb-2"
                />
                <h1 className="text-3xl font-bold text-white">WorkWise</h1>
                <p className="text-gray-500 mt-1">
                  {active ? "Register your account" : "Login to your account"}
                </p>
              </div>

              {active ? <SignupForm /> : <LoginForm />}

              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-600">
                  {active ? "Already have an account?" : "Don't have an account?"}
                </span>
                <Button 
                  onClick={() => setActive(!active)} 
                  variant="link"
                  className="text-blue-500 p-0 h-auto"
                >
                  {active ? "Sign in" : "Sign up"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;