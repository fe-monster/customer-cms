import { useSearchParams } from "react-router";
import { Input } from "./ui/input";
import { useState } from "react";
import useDebounce from "~/hooks/useDebounce";

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const handleSearch = () => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (search) {
          next.set("search", search);
        } else {
          next.delete("search");
        }
        return next;
      });
    }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    }

  useDebounce(handleSearch, 300, [search]);

  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Customer CMS</h1>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={handleChange}
          className="w-80"
        />
      </div>
    </header>
  );
}