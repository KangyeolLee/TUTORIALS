import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Footer from "@components/layouts/Footer";
import Navbar from "@components/layouts/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
