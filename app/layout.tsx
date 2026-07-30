import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { getCurrentUser } from "@/service/auth";



export const metadata: Metadata = {
  title: "Real Estate",
  description: "Find your dream home with our real estate platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser()
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">

        <Toaster position="top-right" richColors />

        <Navbar user={user}/>

        {children}

        
        <Footer />
      </body>
    </html>
  );
}
