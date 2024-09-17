"use client";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Company } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ row }) => {
      const image = row.getValue("profileImage");

      return (
        <div className="px-3">
          <Image
            src={typeof image === "string" ? image : "/images/company-icon.png"}
            width={40}
            height={40}
            alt="Image"
            className="h-auto w-auto"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({column}) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Company name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "cif",
    header: "CIF",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => {
        const {id} = row.original
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="w-8 h-4 p-0">
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/companies/${id}`}>	
                        <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }

];