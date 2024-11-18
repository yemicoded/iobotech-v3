/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
// import {
//   CaretSortIcon,
//   // ChevronDownIcon,
//   DotsHorizontalIcon,
// } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   // DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import CustomPagination from "./custom-pagination";
import CustomTableHeader from "./custom-table-header";
import { TPagination } from "@/types/api-response.interface";

interface Props<T> {
  data: T[];
  columns: ColumnDef<T>[];
  header?: {
    title?: React.ReactNode;
    description?: string;
    searchable?: boolean;
    onSearch?: (searchText: string) => void;
    rightComp?: React.ReactNode;
  };
  pagination?: TPagination;
  showPagination?: boolean;
  isLoading?: boolean;
}

const CustomTable: React.FC<Props<any>> = ({
  data,
  columns,
  header = {
    title: "Table Title",
    description: "Table description",
    searchable: true,
  },
  pagination,
  showPagination = true,
  isLoading,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const searchParams = useSearchParams();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: pagination?.pageCount || 10,
      },
    },
  });

  React.useEffect(() => {
    const params = new URLSearchParams();

    if (!params.has("page")) params.set("page", "1");
    if (!params.has("limit")) params.set("limit", "10");

    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params.toString()}`);
    }
  }, [router]);

  return (
    <div className="w-full flex flex-col gap-4">
      <CustomTableHeader {...header} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination ? <CustomPagination {...pagination!} /> : null}
    </div>
  );
};

export { CustomTable };
