import "./Auth.css";
import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState(true);
  
  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem]">
        <div className="login">
          <div className="w-full px-10 space-y-5">
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
  );
};

export default Auth;