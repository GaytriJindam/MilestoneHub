import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../Project/CreateProjectForm";
import { logout } from "@/redux/Auth/Action";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="border-b border-gray-200 py-3 px-6 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center gap-6">
        {/* Logo and Application Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img 
            src="https://i.pinimg.com/736x/3d/52/c0/3d52c0e851e33f105ea3220a6506736c.jpg" 
            alt="WorkWise Logo"
            className="h-10 w-10 rounded-lg object-cover border border-gray-200 group-hover:border-blue-300 transition-colors"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">WorkWise</h1>
            <p className="text-xs text-gray-500">Project Management System</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button 
                variant="outline" 
                className="border-blue-200 hover:bg-blue-50 text-blue-600 hover:text-blue-700"
              >
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Project</DialogTitle>
              </DialogHeader>
              <CreateProjectForm />
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => navigate("/upgrade_plan")} 
            variant="outline"
            className="border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700"
          >
            Upgrade
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex gap-4 items-center">
        <p className="hidden lg:block text-gray-700 font-medium">{auth.user?.fullName}</p>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border-2 border-gray-300 hover:border-blue-300 transition-colors"
              variant="ghost"
              size="icon"
            >
              <PersonIcon className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 border border-gray-200 shadow-lg rounded-md">
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;