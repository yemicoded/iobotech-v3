import { Text } from "@/components/shared/text";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { convertAmount } from "@/lib/util/convert-amount";
import { TGetTransaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FileSpreadsheet } from "lucide-react";

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
    accessorKey: "propertyUnit",
    header: () => <div className="px-4">Property Unit</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {row.original.unit}
        </Text>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="px-4">Date</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));

      return (
        <Text className="font-medium text-[14px] p-4">
          {format(createdAt, "dd MMM, yyyy p")}
        </Text>
      );
    },
  },
  {
    accessorKey: "product",
    header: () => <div className="px-4">Product</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-medium text-[14px] p-4 capitalize">
          {row.original.product.name}
        </Text>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="px-4">Amount</div>,
    cell: ({ row }) => {
      return (
        <Text className="font-bold text-[14px] p-4">
          {convertAmount(row.original.amount)}
        </Text>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="px-4"></div>,
    cell: ({}) => {
      return <ViewTransactions />;
    },
  },
];

const ViewTransactions: React.FC = () => {
  // const lineItems = [{
  //   label:
  // }]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          leftComp={<FileSpreadsheet />}
          className="text-sm font-semibold text-gray-500"
        >
          VIEW
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>
        </SheetHeader>
      </SheetContent>
      <SheetFooter></SheetFooter>
    </Sheet>
  );
};
