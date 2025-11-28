import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("servicios", "routes/servicios.tsx"),
  route("sobre-nosotros", "routes/sobre-nosotros.tsx"),
  route("contactanos", "routes/contactanos.tsx")
] satisfies RouteConfig;
