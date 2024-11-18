/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { TPagination } from "@/types/api-response.interface";

const CustomPagination = React.forwardRef<
  React.Component<HTMLDivElement>,
  TPagination
>(({ totalPages }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  }, [page]);

  return (
    <ShadPagination className="flex items-center justify-end">
      <PaginationContent>
        <PaginationItem
          className={cn(page === 1 ? "opacity-40 cursor-not-allowed" : null)}
          onClick={() => setPage((page) => (page > 1 ? page - 1 : 1))}
        >
          <PaginationPrevious />
        </PaginationItem>
        {/* {Array.from({ length: totalPages > 5 ? 5 : totalPages || 5 }).map(
          (_, i) => (
            <PaginationItem key={i} onClick={() => setPage(i + 1)}>
              <PaginationLink>{i + 1}</PaginationLink>
            </PaginationItem>
          )
        )} */}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem> */}
        <PaginationItem
          className={cn(
            page === totalPages ? "opacity-40 cursor-not-allowed" : null
          )}
          onClick={() =>
            setPage((page) => (page === totalPages ? page : page + 1))
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
});

CustomPagination.displayName = "CustomPagination";

export default CustomPagination;
