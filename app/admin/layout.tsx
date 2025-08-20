import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/AdminNavbar";
import { Metadata } from "next";
import AdminProtect from "@/components/AdminProtect";

export const metadata: Metadata = {
  title: "Next Blog - Admin",
  description: "Blog admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "var(--background-800)",
            color: "var(--foreground)",
          },
        }}
      />
      <AdminProtect>
        <AdminNavbar />
        {children}
      </AdminProtect>
    </>
  );
}
