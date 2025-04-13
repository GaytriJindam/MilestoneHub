import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { array, object, string } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/redux/Project/Project.Action";
import { DialogClose } from "@/components/ui/dialog";
import { tags } from "./filterData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const formSchema = object({
  name: string().min(1, "Project name is required"),
  description: string().min(1, "Description is required"),
  category: string().min(1),
  tags: array(string()).min(1, "Select at least one tag"),
});

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const { auth, subscription } = useSelector((store) => store);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "fullstack",
      tags: [],
    },
  });

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];
    form.setValue("tags", updatedTags, { shouldValidate: true });
  };

  const removeTag = (tagToRemove) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data) => {
    dispatch(createProject(data));
  };

  const isFreePlanLimitReached = 
    subscription.userSubscription?.planType === "FREE" && 
    auth.user?.projectSize >= 3;

  return (
    <div>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Create New Project</CardTitle>
              <CardDescription>
                Start a new development journey with your team
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 h-12"
                          placeholder="My Awesome Project"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 h-12"
                          placeholder="What's this project about?"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Category</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue="fullstack"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fullstack" className="hover:bg-primary/10">
                              Full Stack
                            </SelectItem>
                            <SelectItem value="frontend" className="hover:bg-primary/10">
                              Frontend
                            </SelectItem>
                            <SelectItem value="backend" className="hover:bg-primary/10">
                              Backend
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <FormControl>
                        <Select onValueChange={handleTagsChange}>
                          <SelectTrigger className="border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 h-12">
                            <SelectValue placeholder="Select technologies used" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {tags.map((tag) => (
                              <SelectItem 
                                key={tag} 
                                value={tag}
                                className="hover:bg-primary/10"
                              >
                                {tag}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      
                      <div className="flex gap-2 flex-wrap mt-2">
                        {field.value.map((item) => (
                          <Badge
                            key={item}
                            variant="outline"
                            className="px-3 py-1 rounded-full cursor-pointer hover:bg-primary/10 transition-colors flex items-center gap-1"
                            onClick={() => removeTag(item)}
                          >
                            <span className="text-sm">{item}</span>
                            <Cross1Icon className="h-3 w-3 text-muted-foreground" />
                          </Badge>
                        ))}
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <DialogClose asChild>
                {isFreePlanLimitReached ? (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-red-600 text-sm font-medium">
                      You've reached the limit of 3 projects on the Free plan. 
                      <span className="block mt-1">Upgrade to create more projects.</span>
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-3 w-full border-red-200 text-red-600 hover:bg-red-100"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add your upgrade logic here
                      }}
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full h-12 font-medium text-white bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
                  >
                    Create Project
                  </Button>
                )}
              </DialogClose>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProjectForm;