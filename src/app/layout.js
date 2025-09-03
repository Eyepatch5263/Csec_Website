import "./globals.css";
import { Inria_Sans, Poppins, Sansita, Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import CanvasAnimation from "../components/CanvasAnimation";
export const metadata = {
  title: "CSEC",
  description: "CSEC Website ",
};
const inria2 = Inria_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sansita = Sansita({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const interFont = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="csec.svg" />
      </head>
      <body className={" " + sansita.className}>
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <CanvasAnimation />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
