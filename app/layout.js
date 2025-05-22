import Navigation from "@/components/nav/Navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./Provider";

export const metadata = {
  title: "Welcome to Sofa Lux.",
  description: "Elevate Your Living Room and Offices with Quality Sofas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StoreProvider>
            <Navigation />
            {children}
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
