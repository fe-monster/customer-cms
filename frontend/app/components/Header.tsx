import { useSearchParams } from "react-router";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  // debounce — запрос только через 300мс после последнего символа
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (search) {
          next.set("search", search);
        } else {
          next.delete("search");
        }
        return next;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Customer CMS</h1>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
      </div>
    </header>
  );
}