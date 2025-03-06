import "../globals.css";

export const metadata = {
  title: "Welcome to Sofa Lux.",
  description: "Elevate Your Living Room and Offices with Quality Sofas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
