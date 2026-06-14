export interface CustomField {
  key: string;
  value: string;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  custom_fields?: CustomField[];
}

export interface CustomerListItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface CustomersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomerListItem[];
}

export interface UpdateCustomerPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  custom_fields?: CustomField[];
}