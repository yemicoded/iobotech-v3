import { CustomTable } from "@/components/shared/custom-table";
import { View } from "@/components/shared/view";
import React from "react";
import { columns } from "./table-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_LINKS } from "@/contants/app-links";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { GetTransactions } from "@/app/services/transaction";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";

interface Props {
  initialData: IGetAPIResponse<TGetTransaction[]>;
}

export const RecentTransactionsTable: React.FC<Props> = ({ initialData }) => {
  const { community } = useCommunity();
  const { data } = useQuery({
    queryKey: [QueryKeys(community).GET_RECENT_TRANSACTIONS],
    queryFn: () =>
      GetTransactions({
        queryParams: {
          limit: "5",
        },
      }),
    initialData,
  });

  return (
    <View>
      <CustomTable
        columns={columns}
        data={data?.data || []}
        showPagination={false}
        header={{
          title: "Recent Transactions",
          searchable: false,
          rightComp: (
            <Link href={APP_LINKS.DASHBOARD_TRANSACTIONS}>
              <Button className="h-8 text-sm">VIEW ALL</Button>
            </Link>
          ),
        }}
      />
    </View>
  );
};
