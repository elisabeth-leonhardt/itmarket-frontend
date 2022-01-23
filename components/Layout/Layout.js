import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Whatsapp from "./Whatsapp";

function Layout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Whatsapp />
      <Footer />
    </main>
  );
}

export default Layout;
