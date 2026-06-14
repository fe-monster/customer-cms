import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "../api/customers";
import type { UpdateCustomerPayload } from "../types/customer";

export const useCustomer = (id: number | null) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customer", id],
    queryFn: () => customersApi.getById(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateCustomerPayload) =>
      customersApi.update(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", id] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => customersApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return {
    customer: query.data,
    isLoading: query.isLoading,
    error: query.isError,
    update: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    delete: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};