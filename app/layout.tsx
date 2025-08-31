import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/components/UserContext";
import StoreProvider from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "SoundWave | Earcommerce",
  description: "We offer the best portable audio devices in town",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // You can add other properties like minimumScale, maximumScale, userScalable
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProvider>
          <UserProvider>
            <Navbar />
            {children}

            <Footer />
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
