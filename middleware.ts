export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/users", "/users/:userId*", "/towers", "/protocols"],
};
