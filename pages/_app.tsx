import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Wrapper from "../components/Navbar/Wrapper/Wrapper";
import NavbarDem from "../components/Navbar/NavbarDem";
import VillageWrapper from "../components/Navbar/Wrapper/VillageWrapper";
import Auth from "../components/Navbar/Auth/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  const user = false;
  return (
    <Wrapper>
      <div className="relative">
        {!user ? (
          <Auth />
        ) : (
          <>
            <NavbarDem />
            <VillageWrapper>
              <Component {...pageProps} />
            </VillageWrapper>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default MyApp;
