"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).min(3, "Name must be at least 3 characters"),
  lastname: z.string({
    required_error: "Lastname is required",
  }).min(3, "Lastname must be at least 3 characters"),
  age: z
    .string({
      required_error: "Age is required",
    })
    .transform((val) => parseInt(val)),
  // civil status
  status: z.enum(["single", "married", "divorced", "widowed"]),
});

type UserType = z.infer<typeof userSchema>; 

const statuses = ["single", "married", "divorced", "widowed"];

function Page() {
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      lastname: "",
      age: 0,
      // status: "",
    }
  });

  console.log(form.formState.errors);

  const onSubmit = form.handleSubmit((values: UserType) => {
    console.log(values);
    // send data to the server
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new user</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  {form.formState.errors?.name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors?.name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="lastname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your lastname</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              name="age"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your age</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Civil status <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default Page;
