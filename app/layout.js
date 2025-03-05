// import Navbg from "@/components/nav/Navbg";
import Navigation from "@/components/nav/Navigation";
import "./globals.css";

export const metadata = {
  title: "Core Tech Org.",
  description: "Providing Software Development Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbg/> */}
        <Navigation/>
        {children}
      </body>
    </html>
  );
}
