"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormContact } from "./FormContact";

export function NewContact() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar nuevo contacto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo contacto</DialogTitle>
          <DialogDescription>
            Complete el formulario para agregar un nuevo contacto
          </DialogDescription>
        </DialogHeader>
        <FormContact setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}