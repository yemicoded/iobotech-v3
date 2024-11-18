import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
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
import { format, formatDate } from "date-fns";
import { Copy, FileSpreadsheet, ReceiptText } from "lucide-react";

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
    cell: ({ row }) => {
      return <ViewTransactions transaction={row.original} />;
    },
  },
];

const ViewTransactions: React.FC<{ transaction: TGetTransaction }> = ({
  transaction,
}) => {
  const lineItems = [
    {
      label: "Service",
      value: transaction.service.name,
    },
    {
      label: "Product",
      value: transaction.product.name,
    },
    transaction.staffName
      ? {
          label: "Staff Name",
          value: transaction.staffName,
        }
      : {
          label: "Name",
          value: transaction.name,
        },
    transaction.isByPassRecharge
      ? {
          label: "Bypassed recharge",
          value: transaction.isByPassRecharge ? "Yes" : "No",
        }
      : null,
    {
      label: "Property unit",
      value: transaction.unit,
    },
    transaction.source
      ? {
          label: "Source",
          value: transaction.source,
        }
      : null,
    transaction.bills
      ? {
          label: "Bills",
          value: transaction.bills,
        }
      : null,
    transaction.remark
      ? {
          label: "Remark",
          value: transaction.remark,
        }
      : null,
    transaction.penaltyFee || transaction.data?.penaltyFee
      ? {
          label: "Penalty Fee",
          value: convertAmount(
            transaction.penaltyFee || transaction.data?.penaltyFee
          ),
        }
      : null,
    transaction.meterId
      ? {
          label: "Meter Number",
          value: transaction.meterId,
        }
      : null,
    transaction.data?.tariff
      ? {
          label: "Tariff",
          value: convertAmount(transaction.data.tariff),
        }
      : null,
    transaction.data?.unit
      ? {
          label: "Unit",
          value: transaction.data.unit,
        }
      : null,
  ];

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
      <SheetContent className="flex h- flex-col 2xl:min-w-[600px]">
        <SheetHeader>
          <View className="flex gap-2">
            <Button
              leftComp={<ReceiptText />}
              size="icon"
              className="rounded-full"
            />
            <View>
              <SheetTitle>Transaction Details</SheetTitle>
              <Text className="">
                Here’a a brief summary of your transaction.
              </Text>
            </View>
          </View>
        </SheetHeader>
        <View className="flex-1 flex flex-col gap-4 py-6">
          <View className="flex items-center justify-between bg-accent p-4 border rounded-lg">
            <Text className="font-medium">Amount</Text>
            <Text className="font-bold text-lg">
              {convertAmount(transaction.amount)}
            </Text>
          </View>
          <View className="flex items-center justify-between">
            <Text className="">Transaction Date</Text>
            <Text className="font-semibold">
              {formatDate(new Date(transaction.createdAt), "dd-MMM-yyyy p")}
            </Text>
          </View>
          <View className="flex items-center justify-between">
            <Text className="">Transaction Status</Text>
            <Text className="font-semibold text-green-600">Successful</Text>
          </View>
          {lineItems.filter(Boolean).map((item, _i) => (
            <View key={_i} className="flex items-center justify-between">
              <Text className="">{item?.label}</Text>
              <Text className="font-semibold capitalize">{item?.value}</Text>
            </View>
          ))}
          {transaction.data?.token && (
            <View className="flex flex-col gap-2 bg-accent p-4 border rounded-lg">
              <Text className="font-medium text-sm">Token</Text>
              <Button
                leftComp={<Copy />}
                variant="link"
                className="p-0 justify-start py-0 h-fit"
              >
                <Text className="font-bold text-lg">
                  {transaction.data?.token}
                </Text>
              </Button>
            </View>
          )}
        </View>
        <SheetFooter className="flex items-center">
          <Button variant="default" className="flex-1">
            Download
          </Button>
          {/* <Button className="flex-1">PROCEED</Button> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
