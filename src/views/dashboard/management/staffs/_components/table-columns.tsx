import { Text } from "@/components/shared/text";
import { Button } from "@/components/ui/button";
import { TGetTransaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { StaffDetails } from "./staff-details";

export const columns: ColumnDef<TGetTransaction>[] = [
  {
    accessorKey: "name",
    header: () => <div className="px-4">Name</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-bold text-[14px] p-4 capitalize">
          {row.original.name}
        </Text>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="px-4">Email</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          vincentnelson466@gmail.com
        </Text>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="px-4">Role</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">Auditor</Text>
      );
    },
  },
  {
    accessorKey: "addedby",
    header: () => <div className="px-4">Added By</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          Super Admin or name
        </Text>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="px-4"></div>,
    cell: ({ row }) => {
      return <StaffDetails transaction={row.original} />;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="px-4"></div>,
    cell: ({ row }) => {
      return <Button className="text-[#FF4B4A]" leftComp={<Trash2 />} variant={"ghost"}/>;
    },
  },
];
