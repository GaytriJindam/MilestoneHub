import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "@/redux/Project/Project.Action";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteProject = () => {
    dispatch(deleteProject({ projectId: item.id }));
  };

  return (
    <Card 
      className={`p-6 w-full transition-all duration-300 ${isHovered ? 'shadow-lg border-primary/20' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 group">
            <h1
              onClick={() => navigate(`/project/${item.id}`)}
              className="text-xl font-bold text-gray-300 group-hover:text-primary cursor-pointer transition-colors duration-200"
            >
              {item.name}
            </h1>
            <span className="flex items-center gap-2">
              <DotFilledIcon className="h-3 w-3 text-gray-400" />
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {item.category}
              </span>
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
              >
                <DotsVerticalIcon className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 border shadow-xl">
              <DropdownMenuItem
                onClick={() => navigate(`/project/update/${item.id}`)}
                className="cursor-pointer"
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDeleteProject}
                className="cursor-pointer text-red-600 hover:text-red-50 focus:text-red-50"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge 
              key={tag}
              variant="outline"
              className=" text-black px-2.5 py-1 text-xs font-medium bg-gray-50 hover:bg-gray-100 transition-colors border-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;