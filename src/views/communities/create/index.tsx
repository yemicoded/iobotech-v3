import { Select } from "@/components/shared/select";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

export const CreateCommunitiesView: React.FC = () => {
  return (
    <View className="h-full flex items-center justify-center">
      <View className="flex flex-col gap-6">
        <View className="text-center flex flex-col gap-2">
          <Text className="font-bold text-3xl text-[#151D48]">
            Welcome onboard!
          </Text>
          <Text className="text-gray-600 font-medium w-[500px] mx-auto">
            You can proceed to add your first community with us.
          </Text>
        </View>
        <View>
          <Card className="w-[700px]">
            {/* <CardHeader>
          <Input leftComp={<Search />} placeholder="Search community" />
        </CardHeader> */}
            <CardContent className="grid grid-cols-2 gap-4 p-0 p-6">
              <Select
                label="Merchant"
                options={[{ label: "Hello", value: "hello" }]}
                placeholder="Select merchant"
              />
              <Input label="Community Name" placeholder="Community name" />
              <Select
                label="Community Type"
                options={[{ label: "Hello", value: "hello" }]}
                placeholder="Select Community Type"
              />
              <Select label="Country" placeholder="Select Country" />
              <Input
                label="State"
                containerClassName=""
                placeholder="Select State"
              />
              <Input
                label="City"
                containerClassName=""
                placeholder="Enter City"
              />
              <Input
                label="Address"
                containerClassName="col-span-2"
                placeholder="1, Chevron Avenue, Lagos"
              />
              <Input
                label="Postal Code"
                containerClassName=""
                placeholder="Enter postal code"
              />
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Add Community</Button>
            </CardFooter>
          </Card>
        </View>
      </View>
    </View>
  );
};
