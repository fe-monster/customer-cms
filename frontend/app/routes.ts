import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/customers.tsx"),
  route("customers", "routes/customers.tsx"),
  route("*", "routes/customers.tsx"),
] satisfies RouteConfig;