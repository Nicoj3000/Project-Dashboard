"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import Axios from "axios";

import { toast } from "@/components/ui/use-toast";

import { UploadButton } from "@/utils/uploadthing";

import { ContactFormProps } from "./ContactForm.types";
import { formSchema } from "./ContactForm.form";

export function ContactForm(props: ContactFormProps) {
  const { contact } = props;
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contact.name,
      role: contact.role,
      phone: contact.phone,
      email: contact.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await Axios.patch(`/api/contact/${contact.id}`, values);
      toast({ title: "Contact edited" });
      router.refresh();
      router.back();
    } catch (error) {
      toast({
        title: "Error editing contact",
        variant: "destructive",
      });
    }
  };

  const onDelete = async () => {
    try {
      await Axios.delete(`/api/contact/${contact.id}`);
      toast({ title: "Contact deleted" });
      router.refresh();
      router.back(); // Redirigir a la página anterior
    } catch (error) {
      toast({
        title: "Error deleting contact",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact name </FormLabel>
                <FormControl>
                  <Input placeholder="Contact name..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el cargo"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="Quality">Customer Servide</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Other">Other...</SelectItem>
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone </FormLabel>
                <FormControl>
                  <Input placeholder="+573132678235" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input placeholder="Email..." type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <Button type="submit">Edit contact</Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete contact
          </Button>
        </div>
      </form>
    </Form>
  );
}
