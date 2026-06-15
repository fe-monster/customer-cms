import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCustomers } from "../../hooks/useCustomers";
import { useCustomersStore } from "../../store/customers.store";
import TableConstants from "../../constants/table";
import Loading from "../Loading";
import Footer from "./Footer";
import { useEffect } from "react";

export function CustomerList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ordering = searchParams.get("ordering") ?? "-created_at";
  const { selectedCustomerId, setSelectedCustomerId } = useCustomersStore();

  const { customers, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, totalCount } =
    useCustomers();

  const { ref: bottomRef, inView } = useInView({
  threshold: 0.1,
});

useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView]);

  const handleSort = (key: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = prev.get("ordering");
      next.set("ordering", current === key ? `-${key}` : key);
      return next;
    });
  };

  const getSortIndicator = (key: string) => {
    if (ordering === key) return " ↑";
    if (ordering === `-${key}`) return " ↓";
    return "";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="p-4 border-b text-sm text-muted-foreground">
        Total: {totalCount} customers
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {TableConstants.COLUMNS.map((col) => (
              <TableHead
                key={col.key}
                className="cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {getSortIndicator(col.key)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className={`cursor-pointer ${
                selectedCustomerId === customer.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedCustomerId(customer.id)}
            >
              <TableCell>{customer.first_name}</TableCell>
              <TableCell>{customer.last_name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Infinite scroll trigger */}
      <div ref={bottomRef} className="py-8 text-center text-sm text-muted-foreground border-t">
        <Footer isFetchingNextPage hasNextPage />
      </div>
    </div>
  );
}