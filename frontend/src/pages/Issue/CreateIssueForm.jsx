import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { createIssue } from "@/redux/Issue/Issue.action";
import { useParams } from "react-router-dom";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  issueName: z.string().min(2, {
    message: "issue name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
});

export function CreateIssueForm({ status }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      createIssue({
        title: data.issueName,
        projectId: id,
        status,
        description: data.description,
      })
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-black p-4 rounded-md text-white"
      >
        <FormField
          control={form.control}
          name="issueName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-zinc-900 text-white placeholder-gray-400 border border-gray-600 focus:ring-0 focus:border-white"
                  placeholder="what needs to be done?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-zinc-900 text-white placeholder-gray-400 border border-gray-600 focus:ring-0 focus:border-white"
                  placeholder="describe your task..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <DialogClose>
          <Button className="bg-white text-black hover:bg-gray-300" type="submit">
            Create Issue
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
