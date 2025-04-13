import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import IssueCard from "./IssueCard";
import { CreateIssueForm } from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIssues } from "@/redux/Issue/Issue.action";
import { ScrollArea } from "@/components/ui/scroll-area";

export function IssueList({ title, status }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { issue } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id]);

  const filteredIssues = issue.issues.filter((item) => item.status === status);

  return (
    <Dialog>
      <Card className="w-full h-full flex flex-col border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredIssues.length})
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-3 pb-3 flex-1">
          <ScrollArea className="h-[calc(100%-50px)] pr-2">
            <div className="space-y-3">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((item) => (
                  <IssueCard item={item} key={item.id} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-gray-400 text-sm">No issues found</p>
                  <p className="text-gray-300 text-xs mt-1">
                    Create a new issue to get started
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="px-3 pt-0">
          <DialogTrigger asChild>
            <Button
              className="w-full border-dashed hover:border-solid transition-all"
              variant="outline"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              <span>Create Issue</span>
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      
      <DialogContent className="max-w-md border-none bg-black backdrop-blur-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Issue</DialogTitle>
        </DialogHeader>
        <CreateIssueForm status={status} />
      </DialogContent>
    </Dialog>
  );
}