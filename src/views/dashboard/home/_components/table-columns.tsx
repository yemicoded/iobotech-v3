import { Text } from "@/components/shared/text";
import { ViewTransaction } from "@/components/shared/view-transaction";
import { convertAmount } from "@/lib/util/convert-amount";
import { TGetTransaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
          {format(createdAt, "dd MMM, yyyy")}
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
    cell: ({ row }) => {
      return <ViewTransaction transaction={row.original} />;
    },
  },
];
