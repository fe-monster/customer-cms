import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { customersApi } from "../api/customers";

export const useCustomers = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const ordering = searchParams.get("ordering") ?? "-created_at";

  const query = useInfiniteQuery({
    queryKey: ["customers", search, ordering],
    queryFn: ({ pageParam = 1 }) =>
      customersApi.getList({ search, ordering, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const customers = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    customers,
    totalCount: query.data?.pages[0]?.count ?? 0,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    error: query.isError,
  };
};