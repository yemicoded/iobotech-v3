import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

interface Props {
  title?: React.ReactNode;
  searchable?: boolean;
  onSearch?: (searchText: string) => void;
  rightComp?: React.ReactNode;
}

const CustomTableHeader = React.forwardRef<
  React.Component<HTMLDivElement>,
  Props
>(({ title, searchable, rightComp, onSearch }) => {
  const [search, setSearch] = React.useState<string>("");
  const [value] = useDebounce(search, 50);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", value.trim());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  }, [value]);

  return (
    <div
      className="flex flex-col xl:flex-row xl:items-center justify-between gap-2"
    >
      <div className="max-w-[700px]">
        {title && <h1 className="text-[22px] font-bold">{title}</h1>}
      </div>
      <div className="flex items-center gap-4">
        {rightComp}
        {searchable && (
          <Input
            size="default"
            leftComp={<Search />}
            placeholder="Enter a search term"
            onChange={({ target }) => {
              setSearch(target.value);
              if (onSearch) {
                onSearch(target.value);
              }
            }}
            containerClassName="w-[350px] rounded-full"
          />
        )}
      </div>
    </div>
  );
});

CustomTableHeader.displayName = "CustomTableHeader";

export default CustomTableHeader;
