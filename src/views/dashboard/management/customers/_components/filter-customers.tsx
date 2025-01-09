import { View } from '@/components/shared/view';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import React from 'react'

export const FilterCustomers: React.FC = () => {
    // const lineItems = [{
    //   label:
    // }]
    return (
      <Sheet>
        <SheetTrigger className="w-fit" asChild>
          <Button
            leftComp={<Filter />}
            variant="link"
            className="font-semibold p-0"
          >
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col 2xl:min-w-[600px]">
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <View className="flex-1 flex flex-col gap-10">
          
          </View>
          <SheetFooter className="flex items-center">
            <Button variant="dark" className="flex-1">
              Reset Filter
            </Button>
            <Button className="flex-1">PROCEED</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };
  