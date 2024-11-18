"use client";
import { SetCommunity } from "@/app/services/community";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_LINKS } from "@/contants/app-links";
import { useCommunity } from "@/store/use-community";
import { TCommunity } from "@/types/community";
import { CircleArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  communities: TCommunity[];
}
export const CommunitiesView: React.FC<Props> = ({ communities }) => {
  const [filteredCommunities, setFilteredCommunities] = React.useState<
    TCommunity[]
  >([]);
  const [search, setSearch] = React.useState<string>("");
  const { setCommunity } = useCommunity();
  const router = useRouter();

  React.useEffect(() => {
    if (search) {
      const filteredComm = communities.filter(
        (comm) =>
          comm.firstName.toLowerCase().includes(search.toLowerCase()) ||
          comm.lastName.toLowerCase().includes(search.toLowerCase()) ||
          comm.communityName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCommunities(filteredComm);
      return;
    } else {
      setFilteredCommunities(communities);
    }
  }, [communities, search]);
  return (
    <View className="h-full flex items-center justify-center">
      <View className="flex flex-col gap-6">
        <View className="text-center flex flex-col gap-2">
          <Text className="font-bold text-3xl text-[#151D48]">
            Welcome to your dashboard!
          </Text>
          <Text className="text-gray-600 font-medium w-[500px]">
            Choose from the list below the communities for which you currently
            have access permissions.
          </Text>
        </View>
        <View>
          <Card>
            <CardHeader>
              <Input
                leftComp={<Search />}
                placeholder="Search community"
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
              {filteredCommunities.map((com, _i) => (
                <View
                  key={_i}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={async () => {
                    setCommunity(com);
                    await SetCommunity(com);
                    router.push(APP_LINKS.DASHBOARD_OVERVIEW);
                  }}
                >
                  <View className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={com.logo}
                        alt="@shadcn"
                        className="object-contain"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <View>
                      <Text className="font-semibold text-primary capitalize">
                        {com.communityName}
                      </Text>
                      <Text className="font-medium text-gray-600 text-[13px]">
                        {com.businessName}
                      </Text>
                    </View>
                  </View>
                  <CircleArrowRight />
                </View>
              ))}
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  );
};
