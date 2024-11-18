"use client";
import { GetCommunities, SetCommunity } from "@/app/services/community";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";
import { QueryKeys } from "@/contants/query-keys";
import { useCommunity } from "@/store/use-community";
import { TCommunity } from "@/types/community";
import { ChevronRight, Plus, Search } from "lucide-react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

export const CommunitySwitch: React.FC = () => {
  const { community } = useCommunity();
  const [isSelectOpen, setSelectOpen] = React.useState<boolean>(false);
  return (
    <View className="w-full">
      <Select open={isSelectOpen} onOpenChange={setSelectOpen}>
        <SelectTrigger
          // asChild
          className="rounded-none active:outline-none border-0 p-0 bg-black/20 border-t-2 h-fit shadow-none flex items-center justify-between w-full overflow-hidden"
        >
          {/* <React.Fragment> */}
          <View className="flex flex-1 items-center gap-2 p-4 overflow-hidden">
            <Avatar className="border border-white">
              <AvatarImage
                src={community.logo}
                alt="@shadcn"
                className="object-contain"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <View className="flex flex-col items-start">
              <Text className="text-white text-lg font-semibold whitespace-nowrap capitalize truncate">
                {community.communityName}
              </Text>
              <Text className="text-gray-500 text-sm line-clamp-1 capitalize">
                {community.businessName}
              </Text>
            </View>
          </View>
          <ChevronRight className="text-gray-100 mr-2" />
          {/* </React.Fragment> */}
        </SelectTrigger>
        <SelectContent
          side="right"
          className="top-0 min-w-[300px] max-w-[350px] p-2"
        >
          <CommunityList
            closeSelect={() => setSelectOpen(false)}
            // initialData={initialData.communities}
          />
        </SelectContent>
      </Select>
    </View>
  );
};

const CommunityList: React.FC<{
  closeSelect: () => void;
  // initialData: IGetAPIResponse<TGetCommunity>;
}> = ({ closeSelect }) => {
  const { setCommunity, community } = useCommunity();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [QueryKeys(community).GET_COMMUNITIES, community.apikey],
    queryFn: () => GetCommunities(),
    // initialData: initialData,
  });

  const [search, setSearch] = React.useState<string>("");
  const [filteredCommunities, setFilteredCommunities] = React.useState<
    TCommunity[]
  >([]);

  React.useEffect(() => {
    if (search) {
      const filteredComm = data?.data?.communities.filter(
        (comm) =>
          comm.firstName.toLowerCase().includes(search.toLowerCase()) ||
          comm.lastName.toLowerCase().includes(search.toLowerCase()) ||
          comm.communityName.toLowerCase().includes(search.toLowerCase())
      ) as TCommunity[];
      setFilteredCommunities(filteredComm);
      return;
    } else {
      setFilteredCommunities(data?.data?.communities as TCommunity[]);
    }
  }, [data?.data?.communities, search]);

  return (
    <View className="h-fit overflow-hidden">
      <View className="flex flex-col gap-2">
        <Input
          // size="sm"
          leftComp={<Search />}
          containerClassName="max-w-full h-10"
          className="max-w-full"
          placeholder="Search community"
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
        <View className="flex items-center justify-between">
          <Text className="uppercase text-primary text-sm font-semibold">
            My Communities
          </Text>
          <Button size="icon" leftComp={<Plus />} className="h-7 w-7" />
        </View>
      </View>
      <SelectGroup className="p-0 py-2 gap-4 max-h-[300px] overflow-y-auto w-full">
        {filteredCommunities?.map((com, _i) => (
          <View
            key={_i}
            className="w-full inline-flex rounded-sm cursor-pointer hover:bg-gray-100 py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
            onClick={async () => {
              closeSelect();
              // const params = new URLSearchParams();
              // params.set("organizationId", org.id);
              setCommunity(com);
              await SetCommunity(com);
              // push(`/${org.id}/dashboard`);
              queryClient.refetchQueries();
              // queryClient.invalidateQueries();
            }}
          >
            <Text className="font-semibold capitalize">
              {com.communityName}{" "}
              <span className="font-medium">({com.businessName})</span>
            </Text>
          </View>
        ))}
      </SelectGroup>
    </View>
  );
};
