import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Price Predictor",
  description: "Machine learning model for predicting the prices of a used car.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#111827]">{children}</body>
    </html>
  );
}
