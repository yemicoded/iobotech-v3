import { Text } from "@/components/shared/text";
import { Button } from "@/components/ui/button";
import { TGetTransaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { ViewRolePermission } from "./view-role";
import { EditRolePermission } from "./edit-role";

export const columns: ColumnDef<TGetTransaction>[] = [
  {
    accessorKey: "name",
    header: () => <div className="px-4">Role</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-bold text-[14px] p-4 capitalize">
          Administrator
        </Text>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="px-4">No. of Permission</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          6
        </Text>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="px-4">Created By</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">Sowore Adeyemi</Text>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="px-4"></div>,
    cell: ({ row }) => {
      return <ViewRolePermission transaction={row.original} />;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="px-4"></div>,
    cell: ({ row }) => {
      return <EditRolePermission transaction={row.original} />;
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
