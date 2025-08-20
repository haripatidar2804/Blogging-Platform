import Navbar from "@/components/Navbar";
import VerifyAccountHeader from "@/components/VerifyAccountHeader";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function UserLayout({
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
        <Navbar />
        <VerifyAccountHeader />
        {children}
        <Footer />
    </>
  );
}
