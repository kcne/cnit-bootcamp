"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button";
import {Check, RotateCcw} from 'lucide-react';
import { Tag, Task } from "@/types/tasks";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "tags",
    header:"Tags",
    cell: ({ row }) => {
    const tags:Tag[] = row.getValue("tags") ?? undefined;
      return <div className="">{tags && tags.map((tag=> (<strong key={tag.id} className="mr-2">#{tag.name}</strong>)))}</div>
    },
  },
  {
    id:"actions",
    header: "Action",
    cell: ({row}) => {
      const isDone = row.getValue("status")=="DONE";
      return <div className="flex gap-1">
        { isDone ? (<Button><RotateCcw /></Button>): (<Button><Check/></Button>)}
        </div>
    },
   },
]
