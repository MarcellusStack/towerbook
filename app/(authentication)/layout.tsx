import { AppLayout } from "@/components/layouts/app-layout";
import AuthLayout from "@/components/layouts/auth-layout";
import { prisma } from "@/server/db";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
