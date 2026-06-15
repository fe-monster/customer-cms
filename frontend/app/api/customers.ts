import axios from "axios";
import type { Customer, CustomerListItem, CustomersResponse, UpdateCustomerPayload } from "../types/customer";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
});

export const customersApi = {
  getList: (params: {
    search?: string;
    ordering?: string;
    page?: number;
  }): Promise<CustomersResponse> =>
    api.get("/customers/", { params }).then((res) => res.data),

  getById: (id: number): Promise<Customer> =>
    api.get(`/customers/${id}/`).then((res) => res.data),

  update: (id: number, payload: UpdateCustomerPayload): Promise<Customer> =>
    api.patch(`/customers/${id}/`, payload).then((res) => res.data),

  delete: (id: number): Promise<void> =>
    api.delete(`/customers/${id}/`).then((res) => res.data),

  create: (payload: UpdateCustomerPayload): Promise<Customer> =>
    api.post("/customers/", payload).then((res) => res.data),
};