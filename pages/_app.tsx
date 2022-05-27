import "../styles/globals.css";
import type {AppProps} from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Wrapper from "../components/Navbar/Wrapper/Wrapper";
import NavbarDem from "../components/Navbar/NavbarDem";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Wrapper>
      <div className="relative">
        <NavbarDem />
        <Component {...pageProps} />
      </div>
    </Wrapper>
  );
}

export default MyApp;
