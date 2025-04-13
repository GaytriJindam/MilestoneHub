import { ScrollArea } from "@/components/ui/scroll-area";
import { IssueList } from "../Issue/IssueList";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProjectById,
  inviteToProject,
} from "@/redux/Project/Project.Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InviteUserForm from "./InviteUserForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, auth } = useSelector((store) => store);
  
  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  const handleProjectInvitation = () => {
    dispatch(inviteToProject({ email: "", projectId: id }));
  };

  return (
    <>
      {!project.loading ? (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-gray-50">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full filter blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full filter blur-3xl translate-x-1/4 translate-y-1/4"></div>
          </div>
          
          <div className="relative z-10 py-6 lg:px-10">
            <div className="lg:flex gap-5 justify-between">
              <ScrollArea className="h-[calc(100vh-100px)] lg:w-[69%] pr-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
                <div className="text-gray-700">
                  <h1 className="text-2xl font-bold pb-5">
                    {project.projectDetails?.name}
                  </h1>

                  <div className="space-y-5 pb-10">
                    <p className="w-full text-gray-600">
                      {project.projectDetails?.description}
                    </p>
                    
                    <div className="flex items-center">
                      <p className="w-36 font-medium">Project Lead:</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="cursor-pointer">
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {project.projectDetails?.owner?.fullName[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p>{project.projectDetails?.owner?.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <p className="w-36 font-medium">Members:</p>
                      <div className="flex items-center gap-2">
                        {project.projectDetails?.team.map((item) => (
                          <Avatar className="cursor-pointer" key={item.id}>
                            <AvatarFallback className="bg-purple-100 text-purple-800">
                              {item.fullName[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {auth.user?.id === project.projectDetails?.owner.id && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="ml-2 border-dashed"
                              >
                                <PlusIcon className="w-3 h-3 mr-1 text-white" />
                                <span className="text-white">Invite</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Invite User</DialogTitle>
                              </DialogHeader>
                              <InviteUserForm projectId={id} />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <p className="w-36 font-medium">Category:</p>
                      <Badge variant="outline" className="capitalize text-black">
                        {project.projectDetails?.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center">
                      <p className="w-36 font-medium">Status:</p>
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                        In Progress
                      </Badge>
                    </div>
                  </div>

                  <section>
                    <h2 className="py-5 border-b text-lg font-semibold tracking-wider">Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                      <IssueList status="pending" title={"Todo List"} />
                      <IssueList status="in_progress" title={"In Progress"} />
                      <IssueList status="done" title={"Done"} />
                    </div>
                  </section>
                </div>
              </ScrollArea>

              <div className="lg:w-[30%] rounded-xl sticky top-6 h-[calc(100vh-50px)]">
                <ChatBox className="bg-white/80 backdrop-blur-sm shadow-sm h-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-gray-50">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProjectDetails;